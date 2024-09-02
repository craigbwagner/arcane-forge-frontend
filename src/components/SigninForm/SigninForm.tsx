import * as authService from "../../services/authService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import useStore from "../../store/store";

const signinSchema = z.object({
  username: z.string(),
  password: z.string(),
});

function SigninForm() {
  const navigate = useNavigate();
  const updateUser = useStore((state) => state.updateUser);
  const user = useStore((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof signinSchema>, e: any) {
    e.preventDefault();
    try {
      const user = await authService.signin(values);
      updateUser(user);
      navigate("/dashboard");
    } catch (err: unknown) {
      console.log(err);
    }
  }

  return (
    <main className="ml-[17rem]">
      <h1>Log In</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
}

export default SigninForm;
