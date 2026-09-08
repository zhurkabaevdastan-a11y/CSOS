# Fourth cohort — stage 2 update

Updated 8 September 2026 using the supplied Russian and Kazakh Word files
«Текст на сайт рус.docx» and «Текст на сайт каз.docx»

- Both source tables are identical, numbered consecutively from 1 to 1517
- 1427 candidates are admitted to stage 2; 90 did not pass stage 1
- The user explicitly allowed public publication of all lists in this task
- Full names and their original spelling are preserved, with only outer cell whitespace trimmed
- Names are marked `translate="no"`; the language switcher respects this attribute
- Statuses and all announcement copy are available in Russian and Kazakh
- The sources say stage 2 starts on 8 September 2026, with instructions sent after 12:00 from noreply@shl.tools
- The previously published stage 2 deadline of 13 September is retained and explicitly labelled as coming from the earlier selection schedule, not the new Word files
- Candidates must choose one language and complete tests through only one of the two emailed links
- SHL links are personal and sent by email; no fabricated shared test or registration button is added
- Stage 1 is archived as completed; its original application URL remains in source configuration
- Programme background, eligibility, development content and later-stage dates are preserved from the existing website
- Eight stages, programme background and development content now have separate real page URLs
- The candidate table is on a separate page, not embedded in the stage overview; no new database or API is needed
- No source documents are distributed separately: the website contains only the requested copy and candidate fields

Validation: `scripts/extract-young-faces.py` checks both Word tables before generating the shared candidate data
