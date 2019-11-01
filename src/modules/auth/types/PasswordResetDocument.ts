import PasswordReset from './PasswordReset';
import { Document } from 'mongoose';

export default interface PasswordResetDocument extends PasswordReset, Document
{
    generateLink( siteUrl: string ): string;
}
