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
    // console.log(values);
    try {
      const res = await fetch("/api/writeBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed to create blog");

      const blog = await res.json();
      console.log("Blog created successfully", blog);
    } catch (error) {
      console.error("Error summit blog: ", error);
    }
  };

  return { WriteBlogForm, onSubmit };
};

export const WriteCommentValidation = ({
  authorId,
  blogId,
}: {
  authorId: string;
  blogId: string;
}) => {
  const form = useForm<WriteCommentsType>({
    resolver: zodResolver(WriteCommentsSchema),
    defaultValues: {
      content: "",
      authorId,
      blogId,
    },
  });

  const onSubmit = async (values: WriteCommentsType) => {
    try {
      const result = await fetch("/api/writeComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!result.ok) throw new Error("Failed to post comment.");

      const data = await result.json();
      console.log("Comment posted!", data);
    } catch (error) {
      console.error("Error posting comment: ", error);
    }
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
    // console.log(values);
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
    // console.log(values);
    await SignUp(values);
  };

  return { SignUpForm, SignUpSubmit };
};
