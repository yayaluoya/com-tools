import type { Options } from 'prettier';

/**
 * Prettierrc工具
 */
export class PrettierrcT {
    /**
     * 获取配置
     * @returns
     */
    static getConfig(op?: Options): Options {
        return {
            printWidth: 90,
            tabWidth: 4,
            useTabs: false,
            semi: true,
            singleQuote: true,
            quoteProps: 'as-needed',
            jsxSingleQuote: false,
            trailingComma: 'all',
            bracketSpacing: true,
            jsxBracketSameLine: false,
            arrowParens: 'always',
            requirePragma: false,
            insertPragma: false,
            vueIndentScriptAndStyle: false,
            proseWrap: 'preserve',
            ...op,
        };
    }
}
