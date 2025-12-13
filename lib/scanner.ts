import { readdirSync, Dirent, existsSync } from 'fs';
import { join, relative } from 'path';

type ScanResult = Record<string, string[]>;

export class ApiScanner {
    private rootDir: string;

    constructor(rootDir: string) {
        this.rootDir = rootDir;
    }

    private readRecursive(base: string, current: string = base): string[] {
        const entries: Dirent[] = readdirSync(current, { withFileTypes: true });
        const result: string[] = [];

        for (const entry of entries) {
            const fullPath = join(current, entry.name);

            if (entry.isDirectory()) {
                result.push(...this.readRecursive(base, fullPath));
            }

            if (entry.isFile()) {
                result.push(
                    relative(base, fullPath)
                        .replace(/\.(ts|js)$/, '')
                        .replace(/\/index$/, ''),
                );
            }
        }

        return result;
    }

    /** 🔹 Ambil semua category */
    public getCategories(): string[] {
        return readdirSync(this.rootDir, { withFileTypes: true })
            .filter(d => d.isDirectory() && !d.name.startsWith('_'))
            .map(d => d.name);
    }

    /** 🔹 Ambil semua feature dalam satu category */
    public getFeatures(category: string): string[] {
        const categoryPath = join(this.rootDir, category);
        if (!existsSync(categoryPath)) return [];

        return this.readRecursive(categoryPath);
    }

    public findFeature(feature: string): { category: string; path: string } | null {
        for (const category of this.getCategories()) {
            const features = this.getFeatures(category);

            for (const f of features) {
                if (f === feature || f.endsWith(`/${feature}`)) {
                    return {
                        category,
                        path: f,
                    };
                }
            }
        }

        return null;
    }

    /** 🔹 Ambil satu feature aja (detail check) */
    // lib/scanner.ts
    public hasFeature(feature: string): boolean {
        for (const category of this.getCategories()) {
            const features = this.getFeatures(category);

            if (features.some(f => f === feature || f.endsWith(`/${feature}`))) {
                return true;
            }
        }
        return false;
    }

    /** 🔹 Full scan (optional) */
    public scanAll(): ScanResult {
        const data: ScanResult = {};

        for (const cat of this.getCategories()) {
            data[cat] = this.getFeatures(cat);
        }

        return data;
    }
}
