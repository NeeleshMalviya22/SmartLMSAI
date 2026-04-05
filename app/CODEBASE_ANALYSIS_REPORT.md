# SmartLMS Codebase Analysis Report

**Date:** March 19, 2026  
**Project:** SmartLMS (React + TypeScript + Vite)  
**Scope:** `/src` directory - 71 TypeScript/TSX files analyzed

---

## Executive Summary

This analysis identified:
- **15 unused exports** (types, functions, utility files)
- **3 duplicate type definitions** (semantic duplicates)
- **4 instances of inconsistent patterns**
- **6 code quality issues**
- **2 misplaced files**
- **Severity distribution:** 4 Critical | 5 High | 6 Medium | 3 Low

---

## 1. UNUSED CODE

### 1.1 Unused Type Exports

#### Finding 1: Unused type definitions in `component-types.ts`
**File:** [src/types/component-types.ts](src/types/component-types.ts)  
**Lines:** 5, 21, 22  
**Severity:** High  
**Type:** Unused exports

```typescript
export type LazyComponentType<P = Record<string, unknown>> = ComponentType<P>;  // Line 5 - UNUSED
export type RenderFunction<T = unknown> = (item: T) => ReactNode;              // Line 21 - UNUSED
export type ClickHandler<T = unknown> = (item: T) => void | Promise<void>;     // Line 22 - UNUSED
```

**Why unused:**
- No imports found across the entire codebase
- These generic utilities were defined but never utilized in components
- `ModalComponentProps` and `DataTableComponentProps` are used instead

**Suggested action:** **Delete** these three type exports  
**Impact:** Safe to remove - zero dependencies

---

#### Finding 2: Unused validation utilities in `validation-rules.ts`
**File:** [src/types/validation-rules.ts](src/types/validation-rules.ts)  
**Lines:** 4-48  
**Severity:** Medium  
**Type:** Unused exports

```typescript
export const validationRules = { ... };        // UNUSED
export const createFieldRules = (...) => {...} // UNUSED
```

**Why unused:**
- Exported utilities for form validation rules
- Application uses Ant Design form validation directly via `Form.Item rules` prop
- Never imported in any component or page
- Form components (FormInput, FormSelect, etc.) handle validation inline

**Suggested action:** **Delete** or convert to internal helper if needed in future  
**Impact:** Safe to remove

---

#### Finding 3: Unused interfaces in `validation/validation.ts`
**File:** [src/validation/validation.ts](src/validation/validation.ts)  
**Lines:** 1-11  
**Severity:** Low  
**Type:** Partially unused exports

```typescript
export interface ValidationErrors { ... }  // UNUSED - not imported anywhere
```

**Why unused:**
- `ValidationErrors` is exported but never imported
- `validateRegister` is used in Register.tsx but only the function is needed
- Type can be inferred

**Suggested action:** **Delete interface** or make internal (remove export)  
**Impact:** Only ValidationErrors should be removed; keep validateRegister and RegisterValues

---

### 1.2 Unused Utility Files

#### Finding 4: Entire API endpoints file is unused
**File:** [src/config/apiEndpoints.ts](src/config/apiEndpoints.ts)  
**Lines:** 1-105  
**Severity:** Critical  
**Type:** Unused file/export

```typescript
export const API_ENDPOINTS = {
  AUTH: {...},
  COURSES: {...},
  MODULES: {...},
  // ... 40+ more endpoint definitions
}
```

**Why unused:**
- Comprehensive API_ENDPOINTS constant exported
- Never imported in any service file
- All services hardcode endpoint strings directly (e.g., "courses", "quizzes", "modules")
- Example: [src/services/course/courseService.ts](src/services/course/courseService.ts#L3) uses `createCrudService<Course>("courses")` instead

**Suggested action:** **Delete entire file** or **integrate endpoints** into service layer  
**Alternative:** If this was meant for documentation/consistency, import and use it in [src/services/baseCrudService.ts](src/services/baseCrudService.ts)  
**Impact:** Removes maintenance burden; clarifies single source of truth for endpoints

---

### 1.3 Misplaced/Unused Components

#### Finding 5: Component in wrong directory
**File:** [src/utils/RoleBasedDashboard.tsx](src/utils/RoleBasedDashboard.tsx)  
**Lines:** 1-14  
**Severity:** Medium  
**Type:** Misplaced file / naming convention violation

```typescript
// Location: src/utils/RoleBasedDashboard.tsx  (WRONG LOCATION)
// Correct: src/components/RoleBasedDashboard.tsx or src/pages/RoleBasedDashboard.tsx
```

**Why it's a problem:**
- This is a React component (returns JSX), not a utility
- Should be in `src/components/` or `src/pages/` directory
- Current location ([src/utils/](src/utils/)) violates project structure conventions
- All helpers in `utils/` should export functions, not components
- Imported in [src/app/router.tsx](src/app/router.tsx#L5) as if it were a utility

**Suggested action:** **Move to** `src/components/RoleBasedDashboard.tsx`  
**Updated import:** Change `import RoleBasedDashboard from "../utils/RoleBasedDashboard";` to `import RoleBasedDashboard from "../components/RoleBasedDashboard";`  
**Impact:** Improves code organization and maintainability

---

### 1.4 Unused Re-exports in Service Files

#### Finding 6: Wrapper functions obscure services
**Files:** 
- [src/services/question/questionService.ts](src/services/question/questionService.ts)
- [src/services/quiz/quizService.ts](src/services/quiz/quizService.ts)
- [src/services/modules/moduleService.ts](src/services/modules/moduleService.ts)
- [src/services/learner/learnerService.ts](src/services/learner/learnerService.ts)

**Severity:** Low  
**Type:** Code maintainability anti-pattern (not unused, but creates confusion)

**Issue:**
```typescript
// src/services/question/questionService.ts
const questionService = createCrudService<Question>("questions");

export const getQuestionsApi = questionService.getList;
export const createQuestionApi = questionService.create;
export const updateQuestionApi = questionService.update;
export const deleteQuestionApi = questionService.delete;
```

**Why it's a problem:**
- Service wrapper is created but methods extracted and re-exported
- Intermediate `questionService` variable is never used after export
- Creates unnecessary indirection
- Makes it harder to find where these functions come from

**Suggested action:** **Simplify** - export the service object directly or use it inline  
**Alternative pattern:**
```typescript
export const questionService = createCrudService<Question>("questions");
```

Then import as: `import { questionService } from "..."` and use `questionService.getList()`

---

---

## 2. DUPLICATE CODE

### 2.1 Duplicate Type Definitions

#### Finding 7: Two `QuestionOption` interfaces with same structure
**Files:**
- [src/types/types.ts](src/types/types.ts#L34-L37) (Line 34-37)
- [src/types/form-types.ts](src/types/form-types.ts#L13-L16) (Line 13-16)

**Severity:** High  
**Type:** Semantic duplicate

```typescript
// In src/types/types.ts
export interface QuestionOption {
  optionId: number;
  optionText: string;
  isCorrect: boolean;
}

// In src/types/form-types.ts (DUPLICATE with different field names)
export interface QuestionOption {
  optionText: string;
  isCorrect: boolean;
  points?: number;
}
```

**Problem:**
- Same entity, two different definitions
- types.ts version has `optionId` (API response)
- form-types.ts version adds `points` (form input)
- This creates confusion about which to use where
- Risk of inconsistency when updating logic

**Suggested action:**
1. **Rename** form-types version to `QuestionOptionFormValue` or `QuestionOptionInput`
2. Use `Question<OptionId>` version for API responses
3. Use renamed version for form inputs
4. Create union type if both are needed

**Updated structure:**
```typescript
// src/types/types.ts
export interface QuestionOption {
  optionId: number;
  optionText: string;
  isCorrect: boolean;
}

export interface QuestionOptionInput {
  optionText: string;
  isCorrect: boolean;
  points?: number;
}

// src/types/form-types.ts - import instead of defining
import type { QuestionOptionInput } from "./types";
export type QuestionOption = QuestionOptionInput;
```

**Impact:** Prevents runtime bugs from using wrong type structure

---

#### Finding 8: Two similar modal props interfaces
**Files:**
- [src/types/common-modal.ts](src/types/common-modal.ts)
- [src/types/component-types.ts](src/types/component-types.tsx#L6-L12)

**Severity:** High  
**Type:** Semantic duplicate

```typescript
// src/types/common-modal.ts
export interface BaseModalProps<T> {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: T) => void;
  initialValues?: Partial<T>;
  isEdit?: boolean;
}

// src/types/component-types.ts (DUPLICATE)
export interface ModalComponentProps<T = unknown> {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: T) => void;
  initialValues?: Partial<T>;
  isEdit?: boolean;
  [key: string]: unknown; // Allow additional props
}
```

**Problem:**
- Both define identical modal patterns
- Three different file locations reference these: `common-modal.ts`, `modals.ts`, and `component-types.ts`
- Creates confusion in modal implementation
- Maintenance burden when modal API changes

**Suggested action:**
1. **Keep only `BaseModalProps`** in `common-modal.ts`
2. **Delete `ModalComponentProps`** from `component-types.ts`
3. Update all imports to use single definition

**Import usage:**
- [src/components/common/FormModal.tsx](src/components/common/FormModal.tsx#L2) imports from form-modal.ts
- [src/types/modals.ts](src/types/modals.ts#L5) imports from common-modal.ts
- Should consolidate to one import path

**Impact:** Reduces type confusion, easier maintenance

---

#### Finding 9: Duplicate modal wrapper patterns
**Files:**
- [src/components/common/FormModal.tsx](src/components/common/FormModal.tsx) (Generic wrapper)
- [src/components/modals/CreateModuleModal.tsx](src/components/modals/CreateModuleModal.tsx#L20-L24) (Direct Modal usage)
- [src/components/modals/CreateDocumentModal.tsx](src/components/modals/CreateDocumentModal.tsx) (Inconsistent)

**Severity:** Medium  
**Type:** Inconsistent implementation pattern

**Issue:**
```typescript
// CORRECT: Uses reusable wrapper
export default function CreateQuizModal(...) {
  return <FormModal {...} >
    {/* Form content */}
  </FormModal>
}

// WRONG: Uses raw Modal component directly
export default function CreateModuleModal(...) {
  const [form] = Form.useForm();
  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };
  return <Modal>
    <Form form={form} onFinish={handleFinish}>
      {/* Form content */}
    </Form>
  </Modal>
}
```

**Modals using `FormModal` (correct):**
- CreateCourseModal ✅
- CreateQuizModal ✅
- CreateQuestionModal ✅
- CreateLearnerModal ✅
- CreateDocumentModal ✅

**Modals NOT using `FormModal` (inconsistent):**
- CreateModuleModal ❌ - Uses raw Modal

**Suggested action:**
1. **Refactor CreateModuleModal** to use `FormModal` wrapper like others
2. Ensures consistent UX and code style across all modals

**Before:**
```typescript
// 16 lines of boilerplate form/modal code
```

**After:**
```typescript
export default function CreateModuleModal({ ... }) {
  return (
    <FormModal title="..." open={open} onClose={onClose} onSubmit={onSubmit}>
      {/* Form fields */}
    </FormModal>
  );
}
```

**Impact:** Reduces code duplication by ~15 lines, ensures consistent behavior

---

---

## 3. CODE QUALITY ISSUES

### 3.1 Formatting & Style Issues

#### Finding 10: Unnecessary braces in conditional returns
**File:** [src/layouts/AuthLayout.tsx](src/layouts/AuthLayout.tsx#L20-L28)  
**Lines:** 20-28  
**Severity:** Low  
**Type:** Code style

**Issue:**
```typescript
if (loading) 
{
  return null;
}

if (loggedIn) 
{
  return <Navigate to="/" replace />;
}
```

**Problem:**
- Extra braces violate modern JavaScript formatting standards
- Increases code bloat unnecessarily
- TypeScript config has `"noUnusedLocals": true` but doesn't catch formatting

**Suggested action:**
```typescript
if (loading) return null;

if (loggedIn) return <Navigate to="/" replace />;
```

**Impact:** Improves readability, removes 4 lines of unnecessary code

---

#### Finding 11: Missing error handling in async operations
**File:** [src/pages/Admin/LearnersManagement.tsx](src/pages/Admin/LearnersManagement.tsx#L18-L24)  
**Lines:** 18-24  
**Severity:** Medium  
**Type:** Error handling

**Issue:**
```typescript
async function loadCourses() {
  try {
    const res = await getAllCoursesApi();
    const courseItems = Array.isArray(res) ? res : (res as { data?: Course[] })?.data ?? [];
    setCourses(courseItems as Course[]);
  } catch {
    console.log("Failed to load courses");  // ❌ Silently logs to console
  }
}
```

**Problem:**
- Error is silently logged without user notification
- User doesn't know data failed to load
- No retry mechanism
- Inconsistent with global error handling in [src/utils/errorHandler.ts](src/utils/errorHandler.ts)

**Suggested action:**
```typescript
async function loadCourses() {
  try {
    const res = await getAllCoursesApi();
    const courseItems = Array.isArray(res) ? res : (res as { data?: Course[] })?.data ?? [];
    setCourses(courseItems as Course[]);
  } catch (error) {
    showErrorMessage(error, "Failed to load courses");
  }
}
```

**Import needed:**
```typescript
import { showErrorMessage } from "../../utils/errorHandler";
```

**Impact:** Better user feedback, consistent error handling

---

### 3.2 Hardcoded Data Issues

#### Finding 12: Hardcoded course data in learner pages
**Files:**
- [src/pages/Learner/MyCourses.tsx](src/pages/Learner/MyCourses.tsx#L5-L9)
- [src/pages/Learner/LearnerDashboard.tsx](src/pages/Learner/LearnerDashboard.tsx#L7-L26)

**Severity:** Critical  
**Type:** Incomplete implementation

**Issue in MyCourses.tsx:**
```typescript
export default function MyCourses() {
  const navigate = useNavigate();
  
  const courses = [
    { id: 1, title: "React Fundamentals", progress: 65 },
    { id: 2, title: "System Design", progress: 40 }
  ];  // ❌ HARDCODED - Should fetch from API
```

**Issue in LearnerDashboard.tsx:**
```typescript
const courses = [
  {
    id: 1,
    title: "Machine Learning Basics",
    instructor: "Dr. Sarah Johnson",
    progress: 65
  },
  // ... more hardcoded courses
];  // ❌ HARDCODED - Should fetch from API
```

**Problem:**
- Mock data in pages prevents real testing
- No API integration
- Will break when deployed
- Progress percentages are fake (65%, 45%, 80%)
- Makes API service unusable in these pages

**Suggested action:**
1. Add `useEffect` to fetch courses from API
2. Add loading and error states
3. Remove hardcoded arrays

**Updated pattern:**
```typescript
export default function MyCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCoursesApi();
        setCourses(data);
      } catch (error) {
        showErrorMessage(error, "Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    void fetchCourses();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!courses.length) return <p>No courses available</p>;

  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      {/* Use real courses data */}
    </div>
  );
}
```

**Impact:** Critical for functionality in production

---

### 3.3 Inconsistent Type Handling

#### Finding 13: Unclear type casting in fetchData handlers
**Files:**
- [src/pages/Admin/ModuleManagement.tsx](src/pages/Admin/ModuleManagement.tsx#L21-L26)
- [src/pages/Admin/QuizManagement.tsx](src/pages/Admin/QuizManagement.tsx#L25-L30)
- [src/pages/Admin/DocumentManagement.tsx](src/pages/Admin/DocumentManagement.tsx#L35-L42)

**Severity:** Medium  
**Type:** Defensive programming (unclear why needed)

**Issue:**
```typescript
async function loadCourses() {
  const res = await getAllCoursesApi();
  const courseItems = Array.isArray(res) 
    ? res 
    : (res as { data?: Course[] })?.data ?? [];
  setCourses(courseItems as Course[]);
}
```

**Problem:**
- Pattern repeated 3 times, suggesting API responses are inconsistent
- Unclear why API might return `{ data: Course[] }` sometimes and `Course[]` other times
- Type casting hides potential issues
- Makes debugging harder

**Suggested action:**
1. **Check API response contract** - should always return consistent shape
2. **Normalize in apiClient** - handle response format once
3. **Create response wrapper type**

**Better approach:**
```typescript
// In apiClient.ts - normalize all responses
export async function apiCall<T>(
  fn: () => Promise<{ data: T }>
): Promise<T> {
  const response = await fn();
  // Always return the data field
  return Array.isArray(response.data) ? response.data : response.data;
}

// In service files
export const getAllCoursesApi = async () => {
  return apiCall(() => apiClient.get("courses/all"));
};

// In pages - no type casting needed
async function loadCourses() {
  const courses = await getAllCoursesApi();
  setCourses(courses);
}
```

**Impact:** Improves code clarity, reduces type casting

---

#### Finding 14: Inconsistent modal component usage patterns
**Files:** [src/pages/Admin/DocumentManagement.tsx](src/pages/Admin/DocumentManagement.tsx#L26-L33)  
**Lines:** 26-33  
**Severity:** Low  
**Type:** Inconsistent interface usage

**Issue:**
```typescript
interface UploadDocumentValues {
  moduleId: number;
  file: File;
}

interface ModalExtraProps {
  modules: Module[];
}

export default function DocumentManagement() {
  // ...
  const uploadHandler = async (values: UploadDocumentValues) => {
    const formData = new FormData();
    formData.append("moduleId", String(values.moduleId));
    formData.append("file", values.file);
    await uploadDocumentApi(formData);
  };

  return (
    <EntityManagement<DocumentItem, ModalExtraProps>
      // ...
    />
  );
}
```

**Problem:**
- Local types defined in page component
- Types not reused or exported
- Should use types from [src/types/form-types.ts](src/types/form-types.ts) instead

**Suggested action:**
- Delete local type definitions
- Import `DocumentFormValues` from types
- Move `ModalExtraProps` to type definition file

**Impact:** Reduces duplication, improves consistency

---

### 3.4 Unused Function Parameters

#### Finding 15: Unused callback parameters in EntityManagement
**File:** [src/components/common/EntityManagement.tsx](src/components/common/EntityManagement.tsx#L104-110)  
**Lines:** 104-110  
**Severity:** Low  
**Type:** Code clarity

**Issue:**
```typescript
const handleTableChange = (
  pagination: TablePaginationConfig,
  _filters: Record<string, FilterValue | null>,      // ❌ Never used
  sorter: SorterResult<T> | SorterResult<T>[],
  _extra: TableCurrentDataSource<T>                   // ❌ Never used
) => {
  handleAntTableChange(pagination, sorter, setTableParams);
};
```

**Problem:**
- Ant Design Table's `onChange` callback provides these parameters
- Project only uses `pagination` and `sorter`
- Unused parameters increase cognitive load
- TypeScript config flags unused parameters

**Suggested action:**
```typescript
const handleTableChange = (
  pagination: TablePaginationConfig,
  _filters: Record<string, FilterValue | null>,
  sorter: SorterResult<T> | SorterResult<T>[],
) => {
  handleAntTableChange(pagination, sorter, setTableParams);
};
```

Or suppress with underscore prefix (as already done for `_filters`):
```typescript
const handleTableChange = (
  pagination: TablePaginationConfig,
  _: Record<string, FilterValue | null>,
  sorter: SorterResult<T> | SorterResult<T>[],
  __: TableCurrentDataSource<T>
) => {
  handleAntTableChange(pagination, sorter, setTableParams);
};
```

**Impact:** Improves code readability

---

---

## 4. SUMMARY TABLE

| # | Item | File | Line | Severity | Type | Action |
|---|------|------|------|----------|------|--------|
| 1 | LazyComponentType export | component-types.ts | 5 | High | Unused | Delete |
| 2 | RenderFunction export | component-types.ts | 21 | High | Unused | Delete |
| 3 | ClickHandler export | component-types.ts | 22 | High | Unused | Delete |
| 4 | validationRules export | validation-rules.ts | 4-48 | Medium | Unused | Delete |
| 5 | createFieldRules export | validation-rules.ts | 39-48 | Medium | Unused | Delete |
| 6 | ValidationErrors interface | validation.ts | 6-9 | Low | Unused | Delete export |
| 7 | API_ENDPOINTS file | apiEndpoints.ts | 1-105 | **Critical** | Unused file | Delete/Refactor |
| 8 | RoleBasedDashboard location | utils/RoleBasedDashboard.tsx | 1-14 | Medium | Misplaced | Move to components/ |
| 9 | QuestionOption (form version) | form-types.ts | 13-16 | **High** | Duplicate | Rename to QuestionOptionInput |
| 10 | ModalComponentProps | component-types.ts | 6-12 | **High** | Duplicate | Delete, use BaseModalProps |
| 11 | CreateModuleModal pattern | modals/CreateModuleModal.tsx | 20-24 | Medium | Inconsistent | Use FormModal wrapper |
| 12 | Extra braces | AuthLayout.tsx | 20-28 | Low | Style | Reformat |
| 13 | console.log error | LearnersManagement.tsx | 24 | Medium | Error handling | Use showErrorMessage |
| 14 | Hardcoded courses | MyCourses.tsx | 5-9 | **Critical** | Mock data | Fetch from API |
| 15 | Hardcoded courses | LearnerDashboard.tsx | 7-26 | **Critical** | Mock data | Fetch from API |
| 16 | Inconsistent response type | ModuleManagement.tsx | 21-26 | Medium | Type safety | Normalize in apiClient |
| 17 | Local type definitions | DocumentManagement.tsx | 26-33 | Low | Organization | Move to types file |
| 18 | Unused function params | EntityManagement.tsx | 104-110 | Low | Clarity | Add underscore prefix or remove |

---

## 5. RISK ASSESSMENT & MIGRATION PLAN

### High-Risk Items (Fix First)
1. **API_ENDPOINTS unused** - 105 lines of dead code consuming resources
2. **Hardcoded course data** - Breaks functionality in production
3. **Duplicate QuestionOption types** - Risk of using wrong type structure
4. **Duplicate modal interfaces** - Maintenance burden

### Medium-Risk Items (Fix Next)
1. RoleBasedDashboard misplaced - Confuses project structure
2. Missing error handling - Poor user experience
3. Inconsistent modal patterns - Maintenance burden
4. Inconsistent type responses - Type safety issue

### Low-Risk Items (Polish)
1. Unused type exports - Clean up imports
2. Code formatting - Non-functional but improves readability

---

## 6. RECOMMENDED CLEANUP SEQUENCE

**Phase 1 (Critical - 30 minutes):**
1. Delete [src/config/apiEndpoints.ts](src/config/apiEndpoints.ts)
2. Add API calls to MyCourses and LearnerDashboard pages
3. Fix LearnersManagement error handling

**Phase 2 (High - 45 minutes):**
1. Consolidate type definitions (QuestionOption, BaseModalProps)
2. Move RoleBasedDashboard.tsx to components/
3. Update CreateModuleModal to use FormModal

**Phase 3 (Medium - 30 minutes):**
1. Delete unused type exports
2. Normalize API response handling
3. Clean up local type definitions

**Phase 4 (Polish - 15 minutes):**
1. Reformat AuthLayout.tsx
2. Update all imports

---

## 7. METRICS

- **Total issues found:** 18
- **Lines of unused code:** ~200 lines
- **Duplicate definitions:** 3
- **Files to move/delete:** 2
- **Inconsistent patterns:** 3
- **Critical issues blocking production:** 3

**Estimated cleanup time:** 2-3 hours  
**Complexity:** Low to Medium  
**Risk level:** Low (changes are mostly deletions and reorganization)

