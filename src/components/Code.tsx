import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  vscDarkPlus,
  vs,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MutuallyExclusive } from 'types';

type ChildProps = {
  children: React.ReactText;
};

type StringProps = {
  codeString: string;
};

type Props = MutuallyExclusive<ChildProps, StringProps> & {
  rounded?: boolean;
  slim?: boolean;
  // TODO: type me
  language?: string;
  theme?: 'light' | 'dark';
  maxHeight?: string;
};

export default function Code({
  codeString,
  children,
  rounded,
  slim,
  language = 'typescript',
  theme = localStorage.theme ?? 'dark',
  maxHeight,
}: Props) {
  const text = codeString ?? children;
  let styles: any =
    theme === 'light'
      ? {
          borderRadius: rounded ? '.375rem' : 0,
          backgroundColor: '#F9FAFB',
          padding: slim ? '.25rem' : '1em',
        }
      : {
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
