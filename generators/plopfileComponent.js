module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a component',

    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/index.tsx',
        templateFile: 'templates/components/index.tsx.hbs',
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/styles.module.scss',
        templateFile: 'templates/components/styles.module.scss.hbs',
      },
      {
        type: 'add',
        path: '../src/__tests__/components/{{pascalCase name}}.spec.tsx',
        templateFile: 'templates/components/index.spec.tsx.hbs',
      },
    ],
  });
};
