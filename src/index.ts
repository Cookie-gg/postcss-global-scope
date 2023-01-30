import postcss, { Rule } from 'postcss';
import type * as PostCSS from 'postcss';
import { REGEXP } from './libs/regexp';

type Options = { skip?: string; classes?: string[]; cssModule?: boolean; strictScope?: boolean };
type Plugin = (decl: PostCSS.Declaration, opts: Required<Options>) => void;

const SPLIT_REGEXP = REGEXP.SPLIT('^');
const defaults: Required<Options> = { skip: '-', classes: [], cssModule: false, strictScope: false };

const plugin: Plugin = (decl, { skip, classes, cssModule, strictScope }) => {
  const { value: values, parent, prop, important } = decl;
  const selector = (parent as Rule).selector;
  const selectorDetails = selector.match(REGEXP.GLOBAL);
  if (classes.length > 0) {
    if (values.match(SPLIT_REGEXP)) {
      values.split(SPLIT_REGEXP).map((value, i) => {
        if (value !== skip) {
          const newRule = postcss.rule({
            selector: `[class${strictScope ? '' : '*'}="${classes[i].replaceAll(/\./g, '')}"] ${selector}`,
          });
          const newDecl = postcss.decl({ prop, value, important });
          newRule.append(newDecl);
          parent?.after(newRule);
        }
      });
      decl.remove();
    }
    if (!cssModule && selectorDetails) {
      const [, globalClass] = selectorDetails;
      const localClass = postcss.list.space(selector).slice(1).join(' ');
      const newRule = postcss.rule({
        selector: `[class${strictScope ? '' : '*'}="${globalClass.replaceAll(/\./g, '')}"] ${localClass}`,
      });
      const newDecl = postcss.decl({ prop, value: values, important });
      newRule.append(newDecl);
      parent?.after(newRule);
      parent?.remove();
    }
  }
};

module.exports = (opts: Options): PostCSS.Plugin => {
  const options = { ...defaults, ...opts };
  return {
    postcssPlugin: 'postcss-global-scope',
    Rule: (rule) => {
      rule.each((child) => child.type === 'decl' && plugin(child, options));
    },
  };
};

module.exports.postcss = true;
