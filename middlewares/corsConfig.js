import cors from "cors";

const corsOptions = cors({
  origin: [
    "https://gadget-plus-ecom.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
});

export default corsOptions;
