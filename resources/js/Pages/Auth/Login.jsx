import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Sign In - TakeYourGoods AI" />

            <div className="mb-6 text-center">
                <h1 className="text-xl font-bold text-white">Sign In to Sourcing Platform</h1>
                <p className="text-xs text-slate-400 mt-1">Access your enterprise procurement reports and wallet</p>
            </div>

            {status && (
                <div className="mb-4 text-xs font-semibold text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Business Email" className="text-slate-300 text-xs font-semibold" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-slate-950/80 border-slate-700 text-white rounded-xl text-sm"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-1.5 text-xs text-rose-400" />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <InputLabel htmlFor="password" value="Password" className="text-slate-300 text-xs font-semibold" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-slate-950/80 border-slate-700 text-white rounded-xl text-sm"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-1.5 text-xs text-rose-400" />
                </div>

                <div className="flex items-center">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                            className="bg-slate-950 border-slate-700 text-blue-600 rounded"
                        />
                        <span className="ms-2 text-xs text-slate-400">
                            Remember this device
                        </span>
                    </label>
                </div>

                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full flex items-center justify-center py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-blue-500/25" 
                        disabled={processing}
                    >
                        {processing ? 'Signing In...' : 'Sign In to Dashboard'}
                    </PrimaryButton>
                </div>

                <div className="text-center pt-3 border-t border-slate-800 text-xs text-slate-400">
                    Don't have an account?{' '}
                    <Link href={route('register')} className="text-blue-400 hover:text-blue-300 font-semibold">
                        Create Corporate Account &rarr;
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}

