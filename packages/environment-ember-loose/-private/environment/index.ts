import { GlintEnvironmentConfig } from '@glint/config';

export default function glimmerxEnvironment(): GlintEnvironmentConfig {
  return {
    template: {
      typesPath: '@glint/environment-ember-loose/-private/dsl',

      getPossibleScriptPaths(templatePath) {
        if (templatePath.endsWith('/template.hbs')) {
          // Pod component
          return [templatePath.replace(/template\.hbs$/, 'component.ts')];
        } else {
          // Colocated component
          let colocatedScriptPath = templatePath.replace(/\.hbs$/, '.ts');

          let paths = [colocatedScriptPath];
          if (templatePath.includes('/templates/components/')) {
            // Classic layout component
            paths.push(colocatedScriptPath.replace('/templates/components/', '/components/'));
          }
          return paths;
        }
      },

      getPossibleTemplatePaths(scriptPath) {
        if (scriptPath.endsWith('/component.ts')) {
          // Pod component
          return [scriptPath.replace(/component\.ts$/, 'template.hbs')];
        } else {
          // Colocated component
          let colocatedTemplatePath = scriptPath.replace(/\.ts$/, '.hbs');

          let paths = [colocatedTemplatePath];
          if (scriptPath.includes('/components/')) {
            // Classic layout component
            paths.push(colocatedTemplatePath.replace('/components/', '/templates/components/'));
          }
          return paths;
        }
      },
    },
  };
}
