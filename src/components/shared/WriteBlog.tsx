"use client";

import React from "react";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { WriteBlogValidation } from "@/constants/FormValidation";
import { InputForm, TextAreaForm } from "./FormComponents";

const WriteBlog = ({ user }: { user: any }) => {
  const { WriteBlogForm, onSubmit } = WriteBlogValidation({
    user: user.id,
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="px-6 py-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Create Your Blog Posts
            </h1>
            <Pencil className="size-8 text-gray-500" />
          </div>

          <Form {...WriteBlogForm}>
            <form onSubmit={WriteBlogForm.handleSubmit(onSubmit)}>
              <InputForm
                control={WriteBlogForm.control}
                formName="title"
                title="Title"
                titleClassName="text-xl"
              />

              <TextAreaForm
                control={WriteBlogForm.control}
                formName="content"
                title="Content"
                titleClassName="text-xl"
                className="mt-5"
              />
              <p className="mb-5 text-sm text-muted-foreground">
                Word count: 0
              </p>

              <div className="grid grid-cols-2 gap-3">
                <InputForm
                  control={WriteBlogForm.control}
                  formName="category"
                  title="Category"
                  placeholder="Technology, Fashion, Health, etc..."
                  titleClassName="text-xl"
                />

                <InputForm
                  control={WriteBlogForm.control}
                  formName="estimateTime"
                  title="Time to Read"
                  placeholder="5-10 minutes"
                  titleClassName="text-xl"
                  type="number"
                />
              </div>

              <div className="mt-5 flex items-center justify-end gap-5">
                <Button variant="outline">Save Draft</Button>
                <Button type="submit">Publish</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default WriteBlog;
