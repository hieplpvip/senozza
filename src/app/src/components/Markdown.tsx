import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { RehypeRewriteOptions } from 'rehype-rewrite';
import _MarkdownEditor from '@uiw/react-markdown-editor';

import 'katex/dist/katex.min.css';

const source = `
# Test

Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following
equation.

$$
L = \\frac{1}{2} \\rho v^2 S C_L
$$
`;

const rehypeRewrite: RehypeRewriteOptions['rewrite'] = (node, _index, parent) => {
  // Disable header links
  if (
    node.type === 'element' &&
    node.tagName === 'a' &&
    parent &&
    parent.type === 'element' &&
    /^h(1|2|3|4|5|6)/.test(parent.tagName)
  ) {
    parent.children = parent.children.slice(1);
  }
};

const previewProps = {
  emarkPlugins: [remarkMath],
  rehypePlugins: [rehypeKatex],
  rehypeRewrite,
};

export function MarkdownEditor() {
  return (
    <_MarkdownEditor
      height='500px'
      width='900px'
      visible={true}
      enableScroll={true}
      previewProps={previewProps}
      value={source}
    />
  );
}

export function MarkdownPreview() {
  return <_MarkdownEditor.Markdown {...previewProps} source={source} />;
}
