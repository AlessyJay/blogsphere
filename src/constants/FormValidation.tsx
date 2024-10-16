import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignInSchema,
  SignInType,
  SignUpSchema,
  SignUpType,
  WriteBlog,
  WriteBlogSchema,
  WriteCommentsSchema,
  WriteCommentsType,
} from "./FormSchemas";
import { SignIn, SignUp } from "./actions/user.actions";

export const WriteBlogValidation = () => {
  const WriteBlogForm = useForm<WriteBlog>({
    resolver: zodResolver(WriteBlogSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
      estimateTime: "",
    },
  });

  const onSubmit = (values: WriteBlog) => {
    console.log(values);
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
