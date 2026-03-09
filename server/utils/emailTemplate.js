export function generateVerificationOtpEmailTemplate(verificationCode) {
  return (`
    <body class="bg-gray-100 m-0 p-0">
      <div class="w-full bg-gray-100 py-10 px-4">
        <div class="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 class="text-2xl font-bold text-gray-800 mb-4">
            Email Verification of Library Management System.
          </h1>

          <p class="text-gray-600 text-base mb-6">
            Use the following One Time Password (OTP) to verify your account.
          </p>

          <div class="bg-gray-100 border border-gray-200 rounded-lg py-4 px-6 inline-block">
            <span class="text-3xl font-bold tracking-widest text-blue-600">
              ${verificationCode}
            </span>
          </div>

          <p class="text-gray-500 text-sm mt-6">
            This OTP will expire in <b>10 minutes</b>.
          </p>

          <p class="text-gray-400 text-xs mt-8">
            If you didn't request this verification, you can safely ignore this
            email.
          </p>

          <div class="mt-8 text-sm text-gray-500">
            © ${new Date().getFullYear()} Your App. All rights reserved.
          </div>
        </div>
      </div>
    </body>`
  );
}
