"use client";

import * as authService from "../services/authService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import useStore from "../store/store";

const signupSchema = z
  .object({
    username: z
      .string()
      .min(4, {
        message: "Username must be 4-16 characters",
      })
      .max(16, {
        message: "Username must be 4-16 characters",
      }),
    password: z
      .string()
      .min(8, {
        message: "Password must be 8-20 characters",
      })
      .max(20, {
        message: "Password must be 8-20 characters",
      }),
    passwordConf: z.string(),
  })
  .superRefine(({ passwordConf, password }, ctx) => {
    if (passwordConf !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

function SignupForm() {
  const navigate = useNavigate();
  const updateUser = useStore((state) => state.updateUser);
  const user = useStore((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      password: "",
      passwordConf: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof signupSchema>, e: any) {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(values);
      updateUser(newUserResponse);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className="ml-[17rem]">
      <h1>Sign Up</h1>
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
                <FormDescription>You will use this to sign in.</FormDescription>
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
                <FormDescription>
                  Should be between 8-20 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <p>
        Don't have an account? <a href="/signin">Sign In</a>
      </p>
    </main>
  );
}

export default SignupForm;
