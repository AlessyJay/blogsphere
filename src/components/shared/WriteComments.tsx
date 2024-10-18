import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Form } from "../ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { TextAreaForm } from "./FormComponents";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { formatBlogDate } from "@/lib/utils";
import { WriteCommentValidation } from "@/constants/FormValidation";

const WriteComments = ({ blog }: { blog: any }) => {
  const { form, onSubmit } = WriteCommentValidation({
    authorId: blog.authorId,
    blogId: blog.id,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={blog.author?.image} />
                <AvatarFallback>
                  {blog.author.displayName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <TextAreaForm
                  control={form.control}
                  formName="content"
                  title=""
                  placeholder="Add a comment"
                />
                <Button type="submit" className="my-2">
                  <Send className="mr-2 size-4" />
                  Post Comment
                </Button>
              </div>
            </div>
          </form>
        </Form>
        <div className="space-y-6">
          {blog.comments.map((comment: any) => (
            <React.Fragment key={comment.id}>
              <div key={comment.id} className="flex space-x-4">
                <Avatar>
                  <AvatarImage src={blog.author?.image} />
                  <AvatarFallback>
                    {blog.author.username
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">
                      {comment.user.username}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {formatBlogDate(comment.commentedAt)} ago
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-700">
                    {comment.content}
                  </p>
                </div>
              </div>
              <hr className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WriteComments;
