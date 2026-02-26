import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const vite = defineConfig({
    test: {
        globals: true,
        coverage: {
            enabled: true,
            provider: "v8",
            thresholds: {
                "100": true,
            },
            exclude: [
                "src/index.ts",
                "src/index.js",
            ],
        },
        setupFiles: [ "./tests/vitest/init.ts" ],
    },
    plugins: [ tsconfigPaths() ],
});

export default vite;
