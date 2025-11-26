import { NormalButton } from '@/features/shared/components/normal-button';
import { NormalText } from '@/features/shared/components/typography';
import { Stack } from '@/features/shared/components/ui/stack';
import { toast } from '@/features/shared/utils';
import { Image } from 'expo-image';
import { printToFileAsync } from 'expo-print';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ResultSheetType } from '../types';
import { getGrade, getLetterGrade, savePDFToDevice } from '../utils';
import { RenderComment } from './render-comments';
import { RenderInfo } from './render-info';
import { RenderScores } from './render-scores';
import { RenderStudent } from './render-student';
import { RenderTermSummary } from './render-term-summary';

type Props = {
  data: ResultSheetType;
};
const HEADERS = [
  'SUBJECT',
  'HOME',
  'TESTS',
  'EXAMS',
  'TOTAL',
  'GRADE',
  'AVG',
  'REMARK',
];
export const RenderResultSheet = ({ data }: Props) => {
  const { comments, school, scores, student, termInfo, termSummary } = data;
  const [isLoading, setIsLoading] = useState(false);
  const classTermAvg =
    scores.reduce((acc, curr) => acc + curr.classAverage, 0) / scores.length;

  const exportHTMLToPDF = async () => {
    try {
      setIsLoading(true);

      const htmlContent = `
       
<html>
<head>
  <meta charset="utf-8">
  <title>Treasure Scientia School Progress Report</title>
      <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.2;
            color: #000;
            background: white;
            padding: 20px;
        }

        .header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            border-bottom: 3px solid #000;
            padding-bottom: 15px;
        }

        .logo {
            width: 80px;
            height: 80px;
            margin-right: 20px;
            border-radius: 50%;
            background: #dc3545;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 10px;
            text-align: center;
            border: 3px solid #000;
        }

        .school-info {
            flex: 1;
            text-align: center;
        }

        .school-name {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .school-address {
            font-size: 11px;
            margin-bottom: 10px;
        }

        .report-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .print-date {
            font-size: 11px;
            text-align: right;
        }

        .student-info {
            display: flex;
            margin-bottom: 15px;
            background: #f8f9fa;
            padding: 10px;
            border: 1px solid #ddd;
        }

        .student-details {
            flex: 1;
        }

        .student-photo {
            width: 80px;
            height: 100px;
            background: #e9ecef;
            border: 1px solid #000;
            margin-left: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
        }

        .info-row {
            display: flex;
            margin-bottom: 5px;
        }

        .info-label {
            font-weight: bold;
            width: 80px;
        }

        .info-value {
            flex: 1;
            border-bottom: 1px dotted #000;
            padding-bottom: 2px;
        }

        .key-info {
            font-size: 10px;
            margin-bottom: 15px;
            text-align: center;
            font-style: italic;
        }

        .grades-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            font-size: 11px;
        }

        .grades-table th,
        .grades-table td {
            border: 1px solid #000;
            padding: 4px;
            text-align: center;
        }

        .grades-table th {
            background: #f8f9fa;
            font-weight: bold;
        }

        .subject-column {
            text-align: left !important;
            padding-left: 8px;
        }

        .grade-a { color: #28a745; }
        .grade-b { color: #007bff; }
        .grade-c { color: #ffc107; }
        .grade-d { color: #fd7e14; }
        .grade-f { color: #dc3545; }

        .summary-section {
            margin-bottom: 20px;
        }

        .summary-title {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
      
            padding-bottom: 5px;
        }

        .summary-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            margin-bottom: 15px;
        }

        .summary-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }

        .summary-label {
            font-weight: bold;
        }

        .comments-section {
            margin-top: 20px;
        }

        .comment-item {
            margin-bottom: 10px;
        }

        .comment-label {
            font-weight: bold;
            margin-bottom: 5px;
        }

        .comment-text {
            border: 1px solid #000;
            padding: 10px;
            min-height: 40px;
            background: #f8f9fa;
        }
    </style>

</head>
<body>
  
      <div class="header">
        <div class="logo">
               <img src=${school.logo} style="width: 100%; height: 100%; object-fit: cover;" alt="School Logo">
        </div>
        <div class="school-info">
            <div class="school-name">${school.name}</div>
            <div class="school-address">${school.address}</div>
            <div class="report-title">Progress Report</div>
        </div>
        <div class="print-date">Print Date: ${new Date().toDateString()}</div>
    </div>


      <div class="student-info">
        <div class="student-details">
            <div class="info-row">
                <span class="info-label">Name</span>
                <span class="info-value">${student.name}</span>
                <span class="info-label" style="margin-left: 20px;">Term</span>
                <span class="info-value">${termInfo.term}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Class</span>
                <span class="info-value">${student.class}</span>
                <span class="info-label" style="margin-left: 20px;">Session</span>
                <span class="info-value">${termInfo.session}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Arm</span>
                <span class="info-value">${student.arm}</span>
                <span class="info-label" style="margin-left: 20px;">Attendance</span>
                <span class="info-value">${student.attendance}</span>
            </div>
        </div>
        <div class="student-photo">
            ${student.image ? `<img src="${student.image}" alt="Student Photo" style="width: 100%; height: 100%; object-fit: cover;">` : 'PHOTO'}
        </div>
    </div>
     <div class="key-info">
        Key: A = Excellent (100 - 75) | B = Very Good (74 - 70) | C = Good (69 - 50) | D = Average (49 - 45) | E = Pass (44 - 40) | N = Needs Improvement (39 - 0)
    </div>
  <table class="grades-table">
    <thead>
    <tr>
      ${HEADERS.map((header) => `<th rowspan="2">${header}</th>`).join('')}
    </tr>
    </thead>
   <tbody>
    ${scores
      .map(
        (subject, i) => `
        <tr>
          <td>${i + 1} ${subject.subjectName}</td>
          <td>${subject.ca3}</td>
          <td>${subject.ca1 + subject.ca2}</td>
          <td>${subject.exam}</td>
          <td>${subject.total}</td>
          <td>${getGrade(subject.total)}</td>
          <td>${Math.round(subject.classAverage)}</td>
          <td>${getLetterGrade(getGrade(subject.total))}</td>
        </tr>
      `
      )
      .join('')}
   </tbody>
    
  </table>
  <div class="summary-section">
    <p class='summary-title'>Character Development</p>
    
    <div class="summary-title">Cumulative Summary</div>
  
    <div class="summary-grid">
            <div>
                <div class="summary-item">
                    <span class="summary-label">Student Term Total:</span>
                    <span>${termSummary.termTotal}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Student Term Average:</span>
                    <span>${termSummary.termAverage}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Term Grade:</span>
                    <span>${termSummary.termGrade}</span>
                </div>
            </div>
            <div>
                <div class="summary-item">
                    <span class="summary-label">Class Term Total:</span>
                    <span>${termSummary.classTermTotal}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Class Term Average:</span>
                    <span>${Math.round(classTermAvg)}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Class Population:</span>
                    <span>${termSummary.classPopulation}</span>
                </div>
            </div>
            <div>
                <div class="summary-item">
                    <span class="summary-label">Class Session Average:</span>
                    <span>${Math.round(termSummary.classSessionAvg)}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Student Session Average:</span>
                    <span>${termSummary.studentSessionAvg}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Session Grade:</span>
                    <span>${termSummary.sessionGrade}</span>
                </div>
            </div>
        </div>

        <div class="summary-item">
            <span class="summary-label">School Re-Opening Date:</span>
            <span>${termInfo.reopening}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Next Term Fees:</span>
            <span>${termSummary.fees}</span>
        </div>
    </div>
  </div>
 

   <div class="comments-section">
        <div class="comment-item">
            <div class="comment-label">Form Teacher's Comments:</div>
            <div class="comment-text">${comments.formTeacher || 'N/A'}</div>
        </div>
        <div class="comment-item">
            <div class="comment-label">Head Teacher's Comments:</div>
            <div class="comment-text">${comments.headTeacher}</div>
        </div>
    </div>
  <div class="footer">
  <img src=${school.stamp} style={{width: 100, height: 100}} />
  </div>
</body>
</html>
      `;

      // Generate PDF from HTML
      const { uri } = await printToFileAsync({
        html: htmlContent,
        base64: false,
        width: 612,
        height: 792,
      });

      await savePDFToDevice(uri, 'result_sheet.pdf');
      toast('PDF saved to device', 'success');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast('Error, Failed to generate PDF. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Stack gap={15} style={{ flex: 1 }}>
        <Image
          source={{ uri: school.logo }}
          style={styles.logo}
          contentFit="cover"
        />
        <NormalText style={styles.center}>{school.name}</NormalText>
        <NormalText style={styles.address}>{school.address}</NormalText>
        <Divider />
        <NormalText style={[styles.center, { fontSize: RFValue(8) }]}>
          A = Excellent (100 - 75) | B = Very Good (74 - 70) | C = Good (69 -
          50) | D = Average (49 - 45) | E = Pass (44 - 40) | NI = Needs
          Improvement (39 - 0)
        </NormalText>
        <Divider />
        <RenderStudent student={student} />
        <Divider />
        <RenderInfo termInfo={termInfo} />
        <Divider />
        <RenderScores scores={scores} />
        <Divider />
        <RenderTermSummary
          termSummary={termSummary}
          classTermAverage={classTermAvg}
        />
        <Divider />
        <RenderComment comments={comments} />

        <Image
          source={{ uri: school.stamp }}
          style={{
            width: 200,
            height: 100,
            alignSelf: 'center',
            marginTop: 10,
          }}
          contentFit="contain"
        />

        <NormalButton
          buttonText={'Download'}
          onPress={exportHTMLToPDF}
          disabled={isLoading}
        />
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  address: { textAlign: 'center', fontSize: RFValue(10) },
  center: { textAlign: 'center' },
  divider: { height: 1, backgroundColor: '#ccc', width: '100%' },
});

const Divider = () => {
  return <View style={styles.divider} />;
};
