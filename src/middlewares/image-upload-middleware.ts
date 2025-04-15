import multer, { StorageEngine } from "multer";
import { Request } from "express";


export const upload = () => {
  const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file, cb) => {
      cb(null, "src/uploads/");
    },
    filename: (req: Request, file, cb) => {
      const suffix = Date.now();
      cb(null, `${suffix}-${file.originalname}`);
    },
  });

  return multer({ storage });
};
