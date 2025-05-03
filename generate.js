const fs = require("fs");
const path = require("path");

const [,, difficulty, ...problemNameParts] = process.argv;
if (!difficulty || problemNameParts.length === 0) {
  console.error("Usage: node generate-problem.js <easy|medium|hard> <problem name>");
  process.exit(1);
}

const validDifficulties = ["easy", "medium", "hard"];
if (!validDifficulties.includes(difficulty)) {
  console.error("Difficulty must be one of: easy, medium, hard");
  process.exit(1);
}

const problemSlug = problemNameParts.join(" ").toLowerCase().replace(/\s+/g, "_");
const problemTitle = problemNameParts.map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
const baseDir = path.join("dsa-solutions", difficulty, problemSlug);

const files = [
  {
    name: "solution.py",
    content: `def ${problemSlug}():\n    pass\n`
  },
  {
    name: "test_solution.py",
    content: `from solution import ${problemSlug}\n\ndef test_${problemSlug}():\n    assert ${problemSlug}() == None\n`
  },
  {
    name: "solution.go",
    content: `package main\n\nfunc ${camelCase(problemSlug)}() interface{} {\n\treturn nil\n}\n`
  },
  {
    name: "solution_test.go",
    content: `package main\n\nimport "testing"\n\nfunc Test${capitalize(camelCase(problemSlug))}(t *testing.T) {\n\tif ${camelCase(problemSlug)}() != nil {\n\t\tt.Error("Expected nil")\n\t}\n}\n`
  },
  {
    name: "solution.rs",
    content: `fn ${problemSlug}() -> Option<()> {\n    None\n}\n\n#[test]\nfn test_${problemSlug}() {\n    assert_eq!(${problemSlug}(), None);\n}\n`
  },
  {
    name: "solution.ts",
    content: `export function ${camelCase(problemSlug)}(): any {\n  return null;\n}\n`
  },
  {
    name: "solution.test.ts",
    content: `import { ${camelCase(problemSlug)} } from "./solution";\n\ntest("${problemSlug}", () => {\n  expect(${camelCase(problemSlug)}()).toBe(null);\n});\n`
  },
  {
    name: "README.md",
    content: `# ${problemTitle}\n\n> Difficulty: ${capitalize(difficulty)}\n\nYour problem description here.\n`
  }
];

if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
  files.forEach(file => {
    const fullPath = path.join(baseDir, file.name);
    fs.writeFileSync(fullPath, file.content);
  });
  console.log(`✅ Created ${baseDir} with solution and test files.`);
} else {
  console.log(`⚠️ ${baseDir} already exists.`);
}

// helpers
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function camelCase(str) {
  return str.split('_').map((w, i) => i === 0 ? w : capitalize(w)).join('');
}
