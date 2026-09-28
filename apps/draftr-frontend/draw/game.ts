import { getShapes } from "./https";

type ShapeInterface =
  | {
      type: "rect";
      x: number;
      y: number;
      height: number;
      width: number;
    }
  | {
      type: "circle";
      centerx: number;
      centery: number;
      radius: number;
    }
  | {
      type: "line";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    }
  | {
      type: "text";
      content: string;
      x: number;
      y: number;
      fontSize: number;
      fontFamily?: string;
    };

export class Game {
  private Canva: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private ExistingShapes: ShapeInterface[];
  private roomId: string;
  private clicked: boolean;
  private startX = 0;
  private startY = 0;
  private selectedTool: string;
  private activeTextInput: HTMLInputElement | null = null;

  socket: WebSocket;

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: any) {
    this.Canva = canvas;
    this.ctx = this.Canva.getContext("2d")!;
    this.ExistingShapes = [];
    this.roomId = roomId;
    this.clicked = false;
    this.selectedTool = "circle";
    this.socket = socket;

    this.resizeCanvasToDisplaySize();
  }

  private resizeCanvasToDisplaySize() {
    const rect = this.Canva.getBoundingClientRect();
    if (this.Canva.width !== rect.width || this.Canva.height !== rect.height) {
      this.Canva.width = rect.width;
      this.Canva.height = rect.height;
    }
  }

  private getCanvasCoordinates(e: MouseEvent) {
    const rect = this.Canva.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  destroy() {
    this.removeActiveTextInput();
    this.Canva.removeEventListener("mousedown", this.mouseDownHandler);
    this.Canva.removeEventListener("mouseup", this.mouseUpHandler);
    this.Canva.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  setTool(tool: string) {
    if (this.selectedTool !== tool) {
      this.removeActiveTextInput();
    }
    this.selectedTool = tool;
  }

  async init() {
    this.initHandlers();
    this.initMouseHandlers();
    this.ExistingShapes = await getShapes(this.roomId);
    this.ClearCanvas();
  }

  initHandlers() {
    if (this.socket) {
      this.socket.onmessage = (event: MessageEvent) => {
        try {
          const parsedData: any = JSON.parse(event.data);
          if (parsedData.type?.trim() === "Send_Message") {
            const message =
              typeof parsedData.message === "string"
                ? JSON.parse(parsedData.message)
                : parsedData.message;
            this.ExistingShapes.push(message);
            this.ClearCanvas();
          }
        } catch (e) {
          console.log("Error Encountered while parsing! : " + e);
        }
      };
    }
  }

  ClearCanvas() {
    this.resizeCanvasToDisplaySize();

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.Canva.width, this.Canva.height);

    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 2;

    this.ExistingShapes.forEach((shape) => {
      if (shape.type === "rect") {
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(
          shape.centerx,
          shape.centery,
          Math.abs(shape.radius),
          0,
          2 * Math.PI
        );
        this.ctx.stroke();
      } else if (shape.type === "line") {
        this.ctx.beginPath();
        this.ctx.moveTo(shape.startX, shape.startY);
        this.ctx.lineTo(shape.endX, shape.endY);
        this.ctx.stroke();
      } else if (shape.type === "text") {
        const fontSize = shape.fontSize || 20;
        const fontFamily = shape.fontFamily || "sans-serif";
        this.ctx.font = `${fontSize}px ${fontFamily}`;
        this.ctx.fillStyle = "white";
        this.ctx.textBaseline = "top";
        this.ctx.fillText(shape.content, shape.x, shape.y);
      }
    });
  }

  private createTextInput(x: number, y: number, clientX: number, clientY: number) {
    this.removeActiveTextInput();

    const input = document.createElement("input");
    input.type = "text";
    
    const fontSize = 20;
    input.style.position = "fixed";
    input.style.left = `${clientX}px`;
    input.style.top = `${clientY}px`;
    input.style.fontSize = `${fontSize}px`;
    input.style.fontFamily = "sans-serif";
    input.style.color = "white";
    input.style.background = "transparent";
    input.style.border = "1px dashed white";
    input.style.outline = "none";
    input.style.padding = "0";
    input.style.margin = "0";
    input.style.zIndex = "1000";

    document.body.appendChild(input);
    setTimeout(() => input.focus(), 0);

    const submitText = () => {
      const content = input.value.trim();
      if (content) {
        const shapeToSend: ShapeInterface = {
          type: "text",
          content,
          x,
          y,
          fontSize,
          fontFamily: "sans-serif",
        };

        this.ExistingShapes.push(shapeToSend);

        const payload = {
          type: "Send_Message",
          message: JSON.stringify(shapeToSend),
          roomId: this.roomId,
        };
        this.socket?.send(JSON.stringify(payload));
        this.ClearCanvas();
      }
      this.removeActiveTextInput();
    };

    input.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        submitText();
      } else if (e.key === "Escape") {
        this.removeActiveTextInput();
      }
    });

    input.addEventListener("blur", () => {
      submitText();
    });

    this.activeTextInput = input;
  }

  private removeActiveTextInput() {
    if (this.activeTextInput) {
      if (this.activeTextInput.parentNode) {
        this.activeTextInput.parentNode.removeChild(this.activeTextInput);
      }
      this.activeTextInput = null;
    }
  }

  mouseDownHandler = (e: MouseEvent) => {
    if (this.selectedTool === "text") {
      const coords = this.getCanvasCoordinates(e);
      this.createTextInput(coords.x, coords.y, e.clientX, e.clientY);
      return;
    }

    this.removeActiveTextInput();
    this.clicked = true;
    const coords = this.getCanvasCoordinates(e);
    this.startX = coords.x;
    this.startY = coords.y;
  };

  mouseUpHandler = (e: MouseEvent) => {
    if (this.selectedTool === "text" || !this.clicked) return;
    this.clicked = false;

    const coords = this.getCanvasCoordinates(e);
    const width = coords.x - this.startX;
    const height = coords.y - this.startY;

    let shapeToSend: ShapeInterface | null = null;

    if (this.selectedTool === "rect") {
      shapeToSend = {
        type: "rect",
        x: this.startX,
        y: this.startY,
        height: height,
        width: width,
      };
    } else if (this.selectedTool === "circle") {
      const radius = Math.sqrt(width * width + height * height) / 2;
      shapeToSend = {
        type: "circle",
        radius: radius,
        centerx: this.startX + width / 2,
        centery: this.startY + height / 2,
      };
    } else if (this.selectedTool === "line") {
      shapeToSend = {
        type: "line",
        startX: this.startX,
        startY: this.startY,
        endX: coords.x,
        endY: coords.y,
      };
    }

    if (shapeToSend) {
      this.ExistingShapes.push(shapeToSend);

      const payload = {
        type: "Send_Message",
        message: JSON.stringify(shapeToSend),
        roomId: this.roomId,
      };
      this.socket?.send(JSON.stringify(payload));
      this.ClearCanvas();
    }
  };

  mouseMoveHandler = (e: MouseEvent) => {
    if (this.selectedTool === "text" || !this.clicked) return;

    const coords = this.getCanvasCoordinates(e);
    const width = coords.x - this.startX;
    const height = coords.y - this.startY;

    this.ClearCanvas();

    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 2;

    if (this.selectedTool === "rect") {
      this.ctx.strokeRect(this.startX, this.startY, width, height);
    } else if (this.selectedTool === "circle") {
      const radius = Math.sqrt(width * width + height * height) / 2;
      const centerX = this.startX + width / 2;
      const centerY = this.startY + height / 2;

      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      this.ctx.stroke();
    } else if (this.selectedTool === "line") {
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(coords.x, coords.y);
      this.ctx.stroke();
    }
  };

  initMouseHandlers() {
    this.Canva.addEventListener("mousedown", this.mouseDownHandler);
    this.Canva.addEventListener("mouseup", this.mouseUpHandler);
    this.Canva.addEventListener("mousemove", this.mouseMoveHandler);
  }
}