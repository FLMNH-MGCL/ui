import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  vscDarkPlus,
  vs,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeProps } from 'types';

export default function Code({
  codeString,
  children,
  rounded,
  slim,
  language = 'typescript',
  theme = localStorage.theme ?? 'dark',
  maxHeight,
  style = {},
}: CodeProps) {
  const text = codeString ?? children;
  let styles: any =
    theme === 'light'
      ? {
          ...style,
          borderRadius: rounded ? '.375rem' : 0,
          backgroundColor: '#F9FAFB',
          padding: slim ? '.25rem' : '1em',
        }
      : {
          ...style,
          borderRadius: rounded ? '.375rem' : 0,
          padding: slim ? '.25rem' : '1em',
        };

  if (maxHeight) {
    styles.maxHeight = maxHeight;
  }

  return (
    <SyntaxHighlighter
      language={language}
      style={theme === 'dark' ? vscDarkPlus : vs}
      customStyle={styles}
    >
      {text}
    </SyntaxHighlighter>
  );
}
