import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            company_name: user.company_name || '',
            vat_number: user.vat_number || '',
            billing_address: user.billing_address || '',
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-white">
                    Profile &amp; B2B Billing Details
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                    Update your account details, company name, VAT ID and billing address for official UK tax invoices.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Full Name" className="text-slate-300" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full bg-slate-900 border-slate-700 text-white"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email Address" className="text-slate-300" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full bg-slate-900 border-slate-700 text-white"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="company_name" value="Company / Legal Entity Name" className="text-slate-300" />

                    <TextInput
                        id="company_name"
                        type="text"
                        className="mt-1 block w-full bg-slate-900 border-slate-700 text-white"
                        placeholder="e.g. Acme Global Logistics Ltd"
                        value={data.company_name}
                        onChange={(e) => setData('company_name', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.company_name} />
                </div>

                <div>
                    <InputLabel htmlFor="vat_number" value="VAT / Tax ID Number (0% Reverse Charge)" className="text-slate-300" />

                    <TextInput
                        id="vat_number"
                        type="text"
                        className="mt-1 block w-full bg-slate-900 border-slate-700 text-white"
                        placeholder="e.g. GB123456789 or DE987654321"
                        value={data.vat_number}
                        onChange={(e) => setData('vat_number', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.vat_number} />
                </div>

                <div>
                    <InputLabel htmlFor="billing_address" value="Registered Billing Address" className="text-slate-300" />

                    <textarea
                        id="billing_address"
                        rows="2"
                        className="mt-1 block w-full rounded-md bg-slate-900 border-slate-700 text-white text-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="e.g. 100 Commercial Road, London, UK"
                        value={data.billing_address}
                        onChange={(e) => setData('billing_address', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.billing_address} />
                </div>


                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
