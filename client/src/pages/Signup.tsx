import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { handleError } from "@/utils/handleError";
import { useSignupMutation } from "@/redux/slices/api";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export default function Signup() {
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function handleSignup(values: z.infer<typeof formSchema>) {
    try {
      await signup(values).unwrap();
      toast.success("Signed up successfully!");
      form.reset();
      navigate("/login");
    } catch (error) {
      handleError(error);
    }
  }
  return (
    <div className="__signup grid-bg w-full h-[calc(100dvh-60px)] flex justify-center items-center flex-col gap-3 bg-background">
      <div className="__form_container h-full sm:h-fit glassmorphism py-8 px-4 flex flex-col gap-5 w-full sm:w-[320px] rounded-xl shadow-2xl">
        <div className="">
          <h1 className="font-mono text-4xl font-bold text-left">Signup</h1>
          <p className=" font-mono text-xs">
            Join the community of expert frontend developers🧑‍💻.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignup)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="email"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button loading={isLoading} className="w-full mt-2" type="submit" variant="blue">
              Signup
            </Button>
          </form>
        </Form>
        <small className="text-xs font-mono text-center">
          Already have an account?{" "}
          <Link className="text-primary font-bold hover:underline" to="/login">
            Login
          </Link>
          .
        </small>
      </div>
    </div>
  );
}
