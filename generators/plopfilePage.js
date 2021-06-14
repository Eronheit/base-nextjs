module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a page',

    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your page name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/pages/{{pascalCase name}}/index.tsx',
        templateFile: 'templates/pages/index.tsx.hbs',
      },
      {
        type: 'add',
        path: '../src/pages/{{pascalCase name}}/styles.module.scss',
        templateFile: 'templates/pages/styles.module.scss.hbs',
      },
      {
        type: 'add',
        path: '../src/__tests__/pages/{{pascalCase name}}.spec.tsx',
        templateFile: 'templates/pages/index.spec.tsx.hbs',
      },
    ],
  });
};
