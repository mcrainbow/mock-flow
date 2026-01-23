import { useState } from 'react';
import { Modal, Button, Input } from '@shared/ui';
import { ButtonVariant } from '@shared/lib';
import { useUpdateUserName } from '../model/hooks/useUpdateUserName';
import { useUserStore } from '@entities/user/model/store';

type EditNameModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const EditNameModal = ({ isOpen, onClose }: EditNameModalProps) => {
  const currentName = useUserStore((state) => state.user.name);
  const [newName, setNewName] = useState(currentName);
  const { mutate: updateName, isPending } = useUpdateUserName();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newName.trim()) {
      return;
    }

    updateName(newName.trim(), {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleClose = () => {
    setNewName(currentName);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Изменить имя</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Новое имя
            </label>
            <Input
              name="name"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Введите новое имя"
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              variant={ButtonVariant.PRIMARY}
              disabled={isPending || !newName.trim() || newName === currentName}
              className="flex-1"
            >
              {isPending ? 'Сохранение...' : 'Сохранить'}
            </Button>
            <Button
              type="button"
              variant={ButtonVariant.SECONDARY}
              onClick={handleClose}
              disabled={isPending}
              className="flex-1"
            >
              Отмена
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
