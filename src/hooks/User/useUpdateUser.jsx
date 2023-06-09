import { useState } from 'react';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  updateEmail,
  updateProfile,
} from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../api/firebase';

export default function useUpdateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ユーザー情報をアップデート
  const updateUser = async (initialValues, values) => {
    try {
      setIsLoading(true);
      setError(null);
      const { displayName: prevDisplayName, email: prevEmail } = initialValues;
      const { displayName, email, password } = values;
      if (prevDisplayName !== displayName) {
        await updateProfile(auth.currentUser, {
          displayName,
        });
      }
      if (prevEmail !== email) {
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          password
        );
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updateEmail(auth.currentUser, email);
        await sendEmailVerification(auth.currentUser);
      }
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        displayName,
        email,
      });
      setIsLoading(false);
    } catch (e) {
      console.log(e.code, e.message);
      switch (e.code) {
        case 'auth/email-already-in-use':
          setError('既にご利用中のメールアドレスです。');
          break;
        case 'auth/network-request-failed':
          setError('通信状況をご確認の上、再度お試し下さい。');
          break;
        case 'auth/user-not-found' || 'auth/user-mismatch':
          setError('メールアドレスまたはパスワードが間違っています。');
          break;
        case 'auth/wrong-password':
          setError('パスワードが間違っています。');
          break;
        case 'auth/invalid-email':
          setError('メールアドレスの形式が正しくありません。');
          break;
        case 'auth/too-many-requests':
          setError(
            'ログインに5回以上失敗しました。しばらく時間を置いてから再度お試し下さい。'
          );
          break;
        default:
          setError('ユーザー情報を変更できませんでした。');
      }
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    updateUser,
  };
}
