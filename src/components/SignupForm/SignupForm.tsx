"use client";

import * as authService from "../../services/authService";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

function SignupForm(props) {
  const navigate = useNavigate();

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
    console.log(values);
    try {
      const newUserResponse = await authService.signup(values);
      console.log(newUserResponse);
      props.updateUser(newUserResponse.user);
      navigate("/");
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
                  <Input placeholder="Password" {...field} />
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
                  <Input placeholder="Confirm Password" {...field} />
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

export default SignupForm;
