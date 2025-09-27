export interface Link {
  label: string;
  url: string;
}

export interface Video {
  label: string;
  url: string;
}

export interface Section {
  title: string;
  content?: string;
  links?: Link[];
  videos?: Video[];
}

export interface Module {
  id: string;
  title: string;
  image?: string;
  description?: string;
  sections: Section[];
}

const modules: Module[] = [
  require("./module1.json"),
  require("./module2.json"),
  require("./module3.json"),
  require("./module4.json"),
  require("./module5.json"),
];

export const course: Module[] = modules;
