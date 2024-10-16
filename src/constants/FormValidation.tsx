import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignInSchema,
  SignInType,
  SignUpSchema,
  SignUpType,
  WriteBlogType,
  WriteBlogSchema,
  WriteCommentsSchema,
  WriteCommentsType,
} from "./FormSchemas";
import { SignIn, SignUp } from "./actions/user.actions";

export const WriteBlogValidation = ({ user }: { user: string }) => {
  const WriteBlogForm = useForm<WriteBlogType>({
    resolver: zodResolver(WriteBlogSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
      estimateTime: "",
      authorId: user,
    },
  });

  const onSubmit = async (values: WriteBlogType) => {
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed to create blog post");

      const data = await res.json();
      console.log("Blog post created:", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return { WriteBlogForm, onSubmit };
};

export const WriteCommentValidation = () => {
  const form = useForm<WriteCommentsType>({
    resolver: zodResolver(WriteCommentsSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (values: WriteCommentsType) => {
    console.log(values);
  };

  return { form, onSubmit };
};

export const SignInValidation = () => {
  const SignInForm = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const SignInSubmit = async (values: SignInType) => {
    console.log(values);
    await SignIn(values);
  };

  return { SignInForm, SignInSubmit };
};

export const SignUpValidation = () => {
  const SignUpForm = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      displayName: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
    },
  });

  const SignUpSubmit = async (values: SignUpType) => {
    console.log(values);
    await SignUp(values);
  };

  return { SignUpForm, SignUpSubmit };
};
