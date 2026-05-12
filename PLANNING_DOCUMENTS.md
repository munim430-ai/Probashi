## 1. **Product Requirements Document — PRD**

### 1.1 **Product Summary**
- **Product name:** Deshantari / Probashi
- **Audience:** Bangladeshi migrant workers abroad
- **Core purpose:** Help workers manage remittance, jobs, documents, legal support, skills, community, safety, and profile data.
- **Current repo state:** Vite React app inside `deshantari-app`; root package delegates `dev`, `build`, and `start` into that app. fileciteturn4file0L3-L3

### 1.2 **Primary User Personas**
- **Migrant worker**
- **Family recipient in Bangladesh**
- **Legal/support advisor**
- **Recruiter/job poster**
- **Platform admin**

### 1.3 **Core Product Modules**
- **Home dashboard**
  - Wallet balance
  - Bangladesh village sync
  - Migration debt/dream goal progress
  - Daily work hours log
  - Prayer times
  - Heat safety shield
- **Send Money**
  - Recipient selection
  - Transfer method
  - SAR to BDT calculation
  - Confirmation
- **Jobs**
  - Job discovery
  - Verified job cards
  - Job details
  - Application submission
- **Documents**
  - Passport, visa, iqama, contract, certificate storage
  - Expiry status
  - Renewal prompts
- **Legal Guardian**
  - Contract review
  - Emergency legal help
  - Embassy links
  - Advisor access
- **Voice Skills**
  - Language learning
  - Voice practice
  - Vocational skills
- **Social Hub**
  - Worker community feed
  - Likes/replies
  - Nearby community discovery
- **Profile**
  - Worker identity
  - Documents
  - Settings
  - Language/security preferences

### 1.4 **Success Metrics**
- **Activation:** user completes profile + adds first document
- **Retention:** weekly active users logging hours or checking documents
- **Remittance conversion:** completed transfer flow rate
- **Jobs:** job application submissions
- **Safety:** heat alert views and emergency/legal contact actions
- **Documents:** expiry reminder engagement
- **Community:** posts, likes, replies

### 1.5 **MVP Scope**
- Auth with **Insforge**
- User profile persistence
- Document CRUD + expiry alerts
- Jobs list + application flow
- Remittance quote/transfer intent flow
- Community feed MVP
- Legal support request flow
- Skills/course progress persistence

### 1.6 **Out of Scope for MVP**
- Real money transfer settlement
- Government API integrations
- AI legal advice automation
- Real embassy form submission
- Real-time voice scoring beyond prototype simulation

---

## 2. **Technical Requirements Document — TRD**

### 2.1 **Current Frontend Stack**
- **React 19**
- **Vite**
- **React Router DOM**
- **Tailwind CSS v4**
- **Framer Motion**
- **Lucide React**
- **clsx**
- **tailwind-merge** fileciteturn6file0L3-L3

### 2.2 **Required Backend Stack**
- **Backend:** Insforge
- **Authentication:** Insforge Auth
- **Database:** Insforge database
- **Storage:** Insforge storage for documents, IDs, PDFs, certificates
- **Server-side functions/API:** Insforge functions or Insforge-compatible backend endpoints

### 2.3 **Frontend Architecture**
- **Routing:** React Router already defines:
  - `/`
  - `/send`
  - `/jobs`
  - `/more`
  - `/profile`
  - `/social`
  - `/legal`
  - `/skills`
  - `/docs` fileciteturn7file0L3-L3
- **Layout shell:** shared header, outlet, mobile bottom navigation
- **Navigation pattern:** bottom nav for main tabs; back-header pattern for secondary pages fileciteturn8file0L3-L3
- **State today:** mostly local React state and mock constants; work-hour log uses `localStorage` in Home. fileciteturn11file0L3-L3

### 2.4 **Backend Responsibilities**
- User authentication
- Role-based access
- User profile persistence
- Document metadata and file storage
- Job listings and applications
- Transfer recipients and transfer intents
- Community posts, likes, replies
- Legal support tickets
- Skills courses, lessons, progress
- Notifications and expiry alerts
- Audit logs for sensitive actions

### 2.5 **Security Requirements**
- Insforge Auth session enforcement
- Row-level access rules by `user_id`
- Admin/reviewer roles for jobs and legal services
- Signed/private file access for documents
- Sensitive document encryption at rest where supported
- Audit trail for document access and legal actions

### 2.6 **Integrations**
- **Phase 1:** no external money movement; quote simulation only
- **Phase 2:** remittance provider integration
- **Phase 2:** weather/heat API
- **Phase 2:** prayer time API
- **Phase 3:** OCR/document validation
- **Phase 3:** speech recognition/voice scoring

---

## 3. **App Flow**

### 3.1 **Global App Shell**
- User opens app
- If unauthenticated:
  - Show login/signup
  - Authenticate through **Insforge Auth**
  - Redirect to Home
- If authenticated:
  - Load profile, documents, notifications, wallet summary
  - Show Home dashboard

### 3.2 **Main Navigation**
- **Home**
- **Send**
- **Jobs**
- **More**
- **Profile**

Current bottom nav already follows this structure. fileciteturn10file0L3-L3

### 3.3 **Home Flow**
- View wallet summary
- View home village sync
- View debt/dream progress
- Log daily work hours
- View overtime warnings
- View Namaz Waqt
- View heat safety alert
- Tap related cards to open detailed modules later

### 3.4 **Send Money Flow**
- Step 1: choose/add recipient
- Step 2: select amount and see exchange rate
- Step 3: confirm transfer
- Success screen
- Store transfer intent in Insforge
- Later connect to real remittance provider

The current UI already has a 3-step send flow with recipient, amount, confirmation, and success state. fileciteturn12file0L3-L3

### 3.5 **Jobs Flow**
- Browse jobs
- Search/filter jobs
- Open job detail
- Review salary, contract, accommodation, food
- Apply
- Store application in Insforge
- Track application status

Current Jobs page includes list, detail view, verified badges, and local application state. fileciteturn13file0L3-L3

### 3.6 **More Flow**
- Open Social Hub
- Open Legal Guardian
- Open Voice Skills
- Open Documents
- Open quick links:
  - Notifications
  - Emergency hotline
  - Language
  - Help/FAQ

Current More page already exposes these feature cards and quick links. fileciteturn14file0L3-L3

### 3.7 **Documents Flow**
- View document list
- See valid/expiring/expired badges
- Expand document details
- Upload/add document
- Download stored document
- Trigger renewal/legal support request

Current Documents page already has document status, accordion expansion, renewal prompts, and add-document CTA. fileciteturn19file0L3-L3

### 3.8 **Legal Guardian Flow**
- View legal services
- Open document issue
- Request advisor
- Request contract review
- Emergency hotline
- Create legal support ticket in Insforge

Current Legal Guardian page includes service cards and document-based renewal/legal actions. fileciteturn17file0L3-L3

### 3.9 **Voice Skills Flow**
- View language courses
- Open lesson
- Practice phrase
- Record voice
- Receive feedback
- Track course progress

Current Voice Skills page includes language courses, progress bars, and a simulated voice-practice flow. fileciteturn18file0L3-L3

### 3.10 **Social Hub Flow**
- View nearby community posts
- Like post
- Reply to post
- Compose new post
- Store post/reaction data in Insforge

Current Social Hub page includes posts, likes, compose flow, and nearby-community hero. fileciteturn16file0L3-L3

### 3.11 **Profile Flow**
- View user profile
- View documents
- Open settings
- Change language
- Manage notifications/security
- Sign out

Current Profile page has profile, documents, and settings tabs. fileciteturn15file0L3-L3

---

## 4. **UI/UX Design Brief**

### 4.1 **Design Rule**
- **Use the existing implemented design only.**
- Do not introduce a new visual direction.
- Preserve current mobile-first app shell, rounded cards, green/red/gold brand system, shadows, and Bengali/English typography.

### 4.2 **Brand Foundation**
- **Primary identity:** Bangladeshi migrant-worker support platform
- **Tone:** warm, direct, empowering, bilingual
- **Languages:** English + বাংলা
- **Visual root:** Bangladesh flag colors, migrant-worker utility, family/home connection fileciteturn5file0L3-L3

### 4.3 **Color System**
Use existing Tailwind theme tokens:
- **Brand Green:** `#006400`
- **Brand Red:** `#CE1126`
- **Brand Gold:** `#F4A832`
- **Neutral background:** `#F5F5F5`
- **Primary text:** `#1A1A1A`
- **White card surfaces**

The actual app theme already defines these tokens in `index.css`. fileciteturn21file0L3-L3

### 4.4 **Typography**
- **English UI:** Poppins
- **Bengali UI:** Noto Sans Bengali
- **Display Bengali:** Galada
- Preserve existing `font-sans`, `font-bengali`, and `font-display`.

### 4.5 **Layout**
- Mobile-first viewport
- Max app width: 375px
- Desktop preview uses phone-shell style with rounded device frame
- Fixed header
- Bottom nav for primary pages
- Card-based vertical scrolling pages

### 4.6 **Core Components**
- Header
- Bottom navigation
- Badge
- Status cards
- Feature cards
- Document accordion
- Hero panels
- Stepper
- Primary/secondary buttons
- Input fields
- Progress bars
- Alert cards

Badge variants are already implemented as default, success, warning, danger, and brand. fileciteturn20file0L3-L3

### 4.7 **Motion**
- Keep Framer Motion where already used
- Subtle page/card transitions
- No bouncy or playful animation
- Preserve current micro-interactions

### 4.8 **Accessibility Requirements**
- Minimum readable font sizes
- Clear active states
- Bilingual labels
- High contrast for status badges
- Large tap targets
- Reduced-motion support in later hardening phase

---

## 5. **Backend Schema — Insforge**

### 5.1 **Authentication**
Use **Insforge Auth**.

Required auth flows:
- Email/password login
- Phone login later
- OTP login later
- Session persistence
- Sign out
- Role claims:
  - `worker`
  - `family`
  - `advisor`
  - `recruiter`
  - `admin`

### 5.2 **Core Tables**

#### **users_profile**
- `id`
- `auth_user_id`
- `full_name`
- `avatar_initial`
- `date_of_birth`
- `nationality`
- `mobile`
- `home_district`
- `current_country`
- `current_city`
- `occupation`
- `language_preference`
- `created_at`
- `updated_at`

#### **wallets**
- `id`
- `user_id`
- `currency`
- `available_balance`
- `bdt_estimate`
- `migration_debt_total`
- `migration_debt_paid`
- `dream_goal_name`
- `dream_goal_target`
- `dream_goal_saved`

#### **recipients**
- `id`
- `user_id`
- `name`
- `phone`
- `country`
- `method`
- `relationship`
- `created_at`

#### **transfer_intents**
- `id`
- `user_id`
- `recipient_id`
- `source_currency`
- `source_amount`
- `exchange_rate`
- `target_currency`
- `target_amount`
- `method`
- `status`
- `provider_reference`
- `created_at`

#### **jobs**
- `id`
- `title`
- `company`
- `country`
- `city`
- `salary_currency`
- `salary_amount`
- `contract_duration`
- `has_accommodation`
- `has_food`
- `is_verified`
- `description`
- `requirements`
- `status`
- `created_by`
- `created_at`

#### **job_applications**
- `id`
- `job_id`
- `user_id`
- `status`
- `submitted_at`
- `reviewed_at`

#### **documents**
- `id`
- `user_id`
- `document_type`
- `document_number`
- `issuer`
- `issue_date`
- `expiry_date`
- `status`
- `file_url`
- `storage_path`
- `created_at`
- `updated_at`

#### **legal_tickets**
- `id`
- `user_id`
- `document_id`
- `type`
- `priority`
- `status`
- `description`
- `assigned_advisor_id`
- `created_at`
- `updated_at`

#### **community_posts**
- `id`
- `user_id`
- `body`
- `location`
- `language`
- `created_at`
- `updated_at`

#### **community_reactions**
- `id`
- `post_id`
- `user_id`
- `type`
- `created_at`

#### **community_replies**
- `id`
- `post_id`
- `user_id`
- `body`
- `created_at`

#### **courses**
- `id`
- `title`
- `category`
- `language`
- `level`
- `is_active`

#### **course_progress**
- `id`
- `user_id`
- `course_id`
- `progress_percent`
- `current_module`
- `completed_at`
- `updated_at`

#### **work_logs**
- `id`
- `user_id`
- `work_date`
- `hours_worked`
- `daily_overtime`
- `weekly_overtime`
- `created_at`

#### **notifications**
- `id`
- `user_id`
- `type`
- `title`
- `body`
- `read_at`
- `metadata`
- `created_at`

#### **audit_logs**
- `id`
- `user_id`
- `action`
- `entity_type`
- `entity_id`
- `metadata`
- `created_at`

### 5.3 **Relationships**
- `users_profile.auth_user_id` → Insforge Auth user
- `wallets.user_id` → `users_profile.id`
- `recipients.user_id` → `users_profile.id`
- `transfer_intents.user_id` → `users_profile.id`
- `transfer_intents.recipient_id` → `recipients.id`
- `job_applications.job_id` → `jobs.id`
- `job_applications.user_id` → `users_profile.id`
- `documents.user_id` → `users_profile.id`
- `legal_tickets.user_id` → `users_profile.id`
- `legal_tickets.document_id` → `documents.id`
- `community_posts.user_id` → `users_profile.id`
- `community_reactions.post_id` → `community_posts.id`
- `community_replies.post_id` → `community_posts.id`
- `course_progress.user_id` → `users_profile.id`
- `course_progress.course_id` → `courses.id`
- `work_logs.user_id` → `users_profile.id`
- `notifications.user_id` → `users_profile.id`

### 5.4 **Access Rules**
- Worker can read/write own profile, documents, recipients, transfers, work logs, progress.
- Worker can read active jobs.
- Worker can create job applications.
- Worker can create community posts/replies/reactions.
- Advisor can read assigned legal tickets.
- Recruiter can manage own job posts.
- Admin can manage all operational tables.
- Document files must be private by default.

---

## 6. **Implementation Plan**

### Phase 1 — **Stabilize Existing App**
- Confirm app builds from root scripts
- Clean obvious UI inconsistencies only if necessary
- Preserve existing design system
- Identify all mock data/constants
- Create environment config for Insforge

### Phase 2 — **Insforge Foundation**
- Set up Insforge project
- Configure Insforge Auth
- Create base database schema
- Create private storage bucket for documents
- Define roles and access policies
- Add seed data matching current mock UI

### Phase 3 — **Authentication + Profile**
- Add login/signup flow
- Protect app routes
- Create user profile on first login
- Replace hardcoded profile with Insforge profile data
- Add sign-out behavior

### Phase 4 — **Documents**
- Replace mock documents with Insforge `documents`
- Add document upload
- Add document status calculation
- Add expiry notifications
- Connect renewal CTAs to legal tickets

### Phase 5 — **Jobs**
- Replace static jobs with Insforge `jobs`
- Add job detail persistence
- Add applications table
- Track application status
- Add recruiter/admin job management later

### Phase 6 — **Send Money**
- Replace local recipient state with Insforge `recipients`
- Store transfer intents
- Keep quote simulation for MVP
- Add transfer history
- Prepare provider integration boundary

### Phase 7 — **Home Dashboard**
- Persist work logs in Insforge
- Calculate weekly/monthly overtime from database
- Load wallet/debt/dream values from Insforge
- Replace static heat/prayer/village data later with APIs

### Phase 8 — **Legal Guardian**
- Create legal support tickets
- Link tickets to documents
- Add advisor assignment
- Add ticket statuses
- Add emergency/legal contact records

### Phase 9 — **Social Hub**
- Replace static posts with Insforge community posts
- Add create post
- Add likes/replies
- Add moderation status
- Add location-based filtering later

### Phase 10 — **Voice Skills**
- Persist courses and progress
- Track lesson completion
- Keep voice recording simulation for MVP
- Add real speech scoring later

### Phase 11 — **Notifications**
- Build notification records
- Document expiry notifications
- Job application status notifications
- Legal ticket updates
- Transfer status updates

### Phase 12 — **Production Hardening**
- Input validation
- Loading/error/empty states
- Offline-safe UX for low-connectivity users
- Security review
- Accessibility pass
- Performance pass
- Deployment pipeline
- Admin/reviewer tools where needed