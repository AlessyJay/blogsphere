import React from "react";
import { Button } from "../ui/button";
import { topics } from "@/constants";

const Topics = () => {
  return (
    <div className="mb-8">
      <h3 className="mb-4 text-lg font-semibold">Topics</h3>
      <div className="flex flex-wrap gap-2">
        {topics.map((item) => {
          return (
            <Button variant={"outline"} key={item.id}>
              {item.title}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Topics;
