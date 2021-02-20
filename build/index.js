import parser from "@babel/parser";
import generator from "@babel/generator";
import types from "@babel/types";
import fse from "fs-extra";
import path from "path";

const __dirname = path.resolve();
const routePath = path.resolve(__dirname, "./src/router.js");

const worker = () => {
  // const data = fse.readFileSync(routePath, "utf-8");
  const data = `codes.map(code=>{return code.toUpperCase()})`;
  const astData = parser.parse(data.toString(), { sourceType: "module" });
  console.log(astData);

  const visitor = {
    ArrowFunctionExpression(path) {
      let params = path.mode.params;
      let blockStatement = path.node.body;
      let func = types.functionExpression(
        null,
        params,
        blockStatement,
        false,
        false
      );
      path.replaceWith(func);
    },
  };
};

worker();
