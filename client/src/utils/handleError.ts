import { toast } from "sonner";

export const handleError = (error: any) => {
  console.log(error);
  if (error?.data?.message) {
    toast.error(error.data.message);
  } else {
    toast.error("Something went wrong!");
  }
};
