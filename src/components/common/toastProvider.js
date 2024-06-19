import { toast, Bounce } from "react-toastify";

export function notify(message, state = "default") {
  switch (state) {
    case "default": {
      toast.info(message);
      break;
    }
    case "error": {
      toast.error(message);
      break;
    }
    case "warn": {
      toast.warn(message);
      break;
    }
    case "success": {
      toast.success(message);
      break;
    }
  }
}
