"use client";

import { Control, FieldPath } from "react-hook-form";
import React from "react";
import { z, ZodTypeAny } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface CommonType<T extends ZodTypeAny> {
  control: Control<z.infer<T>>;
  formName: FieldPath<z.infer<T>>;
  title: string;
  className?: string;
  titleClassName?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  icon?: () => React.ReactNode;
}

export const InputForm = <T extends ZodTypeAny>({
  control,
  formName,
  title,
  className,
  titleClassName,
  placeholder,
  type,
  icon,
}: CommonType<T>) => {
  return (
    <FormField
      control={control}
      name={formName}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={titleClassName}>{title}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder={placeholder}
                {...field}
                className={`w-full ${className}`}
                type={type}
              />
              {icon && (
                <div className="absolute right-3 top-[57%] -translate-y-1/2 text-gray-500 hover:text-gray-700">
                  {typeof icon === "function" ? icon() : icon}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const TextAreaForm = <T extends ZodTypeAny>({
  control,
  formName,
  title,
  className,
  placeholder,
  titleClassName,
}: CommonType<T>) => {
  return (
    <FormField
      control={control}
      name={formName}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={titleClassName}>{title}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={"h-60 w-full resize-none max-sm:h-[144px]"}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
