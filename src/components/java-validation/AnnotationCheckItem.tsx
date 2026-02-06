import { Trash2 } from 'lucide-react';
import type { AnnotationCheck } from './types';

interface AnnotationCheckItemProps {
  check: AnnotationCheck;
  index: number;
  onChange: (index: number, updated: AnnotationCheck) => void;
  onRemove: (index: number) => void;
}

export function AnnotationCheckItem({ check, index, onChange, onRemove }: AnnotationCheckItemProps) {
  const handleToggleClassLevel = () => {
    if (check.classLevel) {
      // Switching from class-level to field-level
      onChange(index, {
        annotationSimpleName: check.annotationSimpleName,
        fieldName: '',
      });
    } else {
      // Switching to class-level
      onChange(index, {
        classLevel: true,
        annotationSimpleName: check.annotationSimpleName,
      });
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Class Level Toggle */}
        <div className="flex items-center gap-2 sm:col-span-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={check.classLevel || false}
              onChange={handleToggleClassLevel}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
          <span className="text-sm text-slate-700">Class-level annotation</span>
        </div>

        {/* Field Name (only if not class-level) */}
        {!check.classLevel && (
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Field Name</label>
            <input
              type="text"
              value={check.fieldName || ''}
              onChange={(e) => onChange(index, { ...check, fieldName: e.target.value })}
              className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. id, name"
            />
          </div>
        )}

        {/* Annotation Simple Name */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Annotation Name</label>
          <input
            type="text"
            value={check.annotationSimpleName}
            onChange={(e) => onChange(index, { ...check, annotationSimpleName: e.target.value })}
            className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g. Entity, Id, NotBlank"
          />
        </div>

        {/* Alternative Annotations (only if not class-level) */}
        {!check.classLevel && (
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Alternative Annotations <span className="text-slate-400">(comma-separated, optional)</span>
            </label>
            <input
              type="text"
              value={(check.alternativeAnnotations || []).join(', ')}
              onChange={(e) => {
                const alts = e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean);
                onChange(index, {
                  ...check,
                  alternativeAnnotations: alts.length > 0 ? alts : undefined,
                });
              }}
              className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. NotNull, NonEmpty"
            />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => onRemove(index)}
        className="mt-1 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
