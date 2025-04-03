"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { Button } from "../ui/button";
import { useLanguage } from "@/context/LanguageProvider";

const LanguageSelection = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="outline-none focus:ring-0"
        >
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Choose Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={language === "hi"}
          onCheckedChange={() => setLanguage("hi")}
        >
          Hindi (हिंदी)
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={language === "en"}
          onCheckedChange={() => setLanguage("en")}
        >
          English
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelection;
