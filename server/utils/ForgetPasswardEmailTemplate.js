export function ForgetPasswordEmailTemplate(resetLink) {
  return (`
    <body class="bg-gray-100 m-0 p-0">
      <div class="w-full bg-gray-100 py-10 px-4">
        <div class="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          
          <h1 class="text-2xl font-bold text-gray-800 mb-4">
            Password Reset Request
          </h1>

          <p class="text-gray-600 text-base mb-6">
            You requested to reset your password for the <b>Library Management System</b>.
          </p>

          <p class="text-gray-600 text-base mb-4">
            Click the button below or copy the highlighted link.
          </p>

          <!-- Reset Button -->
          <div class="my-6">
            <a href="${resetLink}"
               class="bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg inline-block"
               style="text-decoration:none;">
               Reset Password
            </a>
          </div>

          <p class="text-gray-600 text-sm mb-2">
            Or copy and paste this link into your browser:
          </p>

          <!-- Highlighted Link -->
          <div class="bg-yellow-100 border border-yellow-300 rounded-lg p-4 break-all">
            <span class="text-blue-700 font-semibold text-lg">
              ${resetLink}
            </span>
          </div>

          <p class="text-gray-500 text-sm mt-6">
            This reset link will expire in <b>15 minutes</b>.
          </p>

          <p class="text-gray-400 text-xs mt-8">
            If you didn't request a password reset, you can safely ignore this email.
          </p>

          <div class="mt-8 text-sm text-gray-500">
            © ${new Date().getFullYear()} Library Management System. All rights reserved.
          </div>

        </div>
      </div>
    </body>
  `);
}