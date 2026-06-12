import { useParams } from 'react-router-dom'
import { chaptersData } from '../data/chapters'
import { ContentBlock } from './ContentBlock'
import { ExerciseBlock } from './ExerciseBlock'
import { PracticeBlock } from './PracticeBlock'
import { ExportAnswers } from './ExportAnswers'

export function ChapterPage() {
  const { chapterId } = useParams<{ chapterId: string }>()
  const chapter = chaptersData.find(ch => ch.id === chapterId)

  if (!chapter) {
    return (
      <div className="chapter-page">
        <p>Chapter not found.</p>
      </div>
    )
  }

  return (
    <div className="chapter-page">
      <div className="chapter-header">
        <div className="chapter-number">Chapter {chapter.number}</div>
        <h1>{chapter.title}</h1>
        <div className="chapter-tags">
          {chapter.tacticTags.map(tag => (
            <code key={tag} className="chapter-tag">
              {tag}
            </code>
          ))}
        </div>
      </div>

      <div className="chapter-content">
        {chapter.sections.map(section => (
          <section key={section.id} id={section.id} className="section">
            <h2>{section.title}</h2>

            {section.kind === 'explanation' && section.content?.map((block, index) => (
              <ContentBlock key={index} block={block} />
            ))}

            {section.kind === 'exercise' && (
              <>
                {section.intro?.map((block, index) => (
                  <ContentBlock key={index} block={block} />
                ))}
                <ExerciseBlock section={section} />
              </>
            )}

            {section.kind === 'practice' && (
              <>
                {section.intro?.map((block, index) => (
                  <ContentBlock key={index} block={block} />
                ))}
                <PracticeBlock section={section} />
              </>
            )}

            <div className="section-divider" />
          </section>
        ))}

        {/* Export Answers button at the end of the last chapter */}
        {chapter.id === 'ai-proofs' && <ExportAnswers />}
      </div>
    </div>
  )
}
