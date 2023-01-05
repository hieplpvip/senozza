import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { RehypeRewriteOptions } from 'rehype-rewrite';
import _MarkdownEditor from '@uiw/react-markdown-editor';

import 'katex/dist/katex.min.css';

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
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeKatex],
  rehypeRewrite,
};

export function MarkdownEditor({
  height,
  width,
  value,
  setValue,
}: {
  height: string;
  width: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <_MarkdownEditor
      height={height}
      width={width}
      visible={true}
      enableScroll={true}
      previewProps={previewProps}
      value={value}
      onChange={setValue}
    />
  );
}

export function MarkdownPreview({ source }: { source: string }) {
  return <_MarkdownEditor.Markdown {...previewProps} source={source} />;
}
