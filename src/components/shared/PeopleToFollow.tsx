import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

const PeopleToFollow = () => {
  return (
    <div className="mb-8">
      <h3 className="mb-4 text-lg font-semibold">People to Follow</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => {
          return (
            <Card key={item}>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Avatar className="size-10">
                    <AvatarFallback>Mark</AvatarFallback>
                  </Avatar>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium">Suggest User {item}</p>
                    <p className="text-xs text-muted-foreground">
                      @suggestedUser {item}
                    </p>
                  </div>
                </div>

                <Button size="sm" variant={"outline"} className="mt-2 w-full">
                  Follow
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PeopleToFollow;
