import React from 'react';
import { PropsOf } from '../../types';
import Button from '../Button';
import Spinner from '../Spinner';

type Props = {
  icon: React.ReactNode;
  loading?: boolean;
} & PropsOf<'button'>;

export default function CircleButton({
  icon,
  onClick,
  loading,
  ...props
}: Props) {
  return (
    <Button variant="outline" rounded onClick={onClick} {...props}>
      {loading ? (
        <span className="flex items-center justify-center mx-auto">
          <Spinner size="sm" color="white" inline active={loading} />
        </span>
      ) : (
        icon
      )}
    </Button>
  );
}
