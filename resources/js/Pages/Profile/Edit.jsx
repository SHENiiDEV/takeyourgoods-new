import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-white">
                    Company Profile &amp; Account Settings
                </h2>
            }
        >
            <Head title="Profile &amp; Billing - TakeYourGoods AI" />

            <div className="py-6 space-y-6">
                <div className="bg-slate-900/60 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-2xl"
                    />
                </div>

                <div className="bg-slate-900/60 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl">
                    <UpdatePasswordForm className="max-w-2xl" />
                </div>

                <div className="bg-slate-900/60 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl">
                    <DeleteUserForm className="max-w-2xl" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

