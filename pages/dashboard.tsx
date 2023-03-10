import Head from 'next/head';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FlexDiv, FlexDivCol, FlexDivColCentered, FlexDivRowCentered } from 'styles/common';
import SNXStatBackground from 'assets/svg/snx-stat-background.svg';
import useGetDebtDataQuery from 'queries/debt/useGetDebtDataQuery';
import useSNXBalanceQuery from 'queries/walletBalances/useSNXBalanceQuery';

const DashboardPage = () => {
	const { t } = useTranslation();
	const debtDataQuery = useGetDebtDataQuery();
	const snxBalanceQuery = useSNXBalanceQuery();

	const stakedValue = snxBalanceQuery?.data?.balance
		? snxBalanceQuery.data.balance *
		  Math.min(1, debtDataQuery.data.currentCRatio / debtDataQuery.data.targetCRatio)
		: 0;
	const activeDebt = debtDataQuery.data?.debtBalance;
	return (
		<>
			<Head>
				<title>{t('dashboard.page-title')}</title>
			</Head>
			<Content>
				<StatsSection>
					{/* @TODO Refactor to StatBox.tsx */}
					<StatBox
						style={{
							backgroundImage: `url(${SNXStatBackground})`,
						}}
					>
						<StatTitle titleColor={'brightBlue'}>{t('dashboard.stat-box.staked-value')}</StatTitle>
						<StatValue>{stakedValue}</StatValue>
					</StatBox>

					<StatBox
						style={{
							backgroundImage: `url(${SNXStatBackground})`,
						}}
					>
						<StatTitle titleColor={'brightGreen'}>{t('dashboard.stat-box.earning')}</StatTitle>
						<StatValue>6.14%</StatValue>
					</StatBox>

					<StatBox
						style={{
							backgroundImage: `url(${SNXStatBackground})`,
						}}
					>
						<StatTitle titleColor={'brightPink'}>{t('dashboard.stat-box.active-debt')}</StatTitle>
						<StatValue>{activeDebt}</StatValue>
					</StatBox>

					<BarStats>
						<BarStatBox>
							<BarHeaderSection>
								<BarTitle></BarTitle>
								{/* <BarPercentage></BarPercentage> */}
							</BarHeaderSection>
							<BarContent></BarContent>
						</BarStatBox>
					</BarStats>
				</StatsSection>
			</Content>
		</>
	);
};

const Content = styled(FlexDivCol)`
	justify-content: center;
	align-items: center;
`;

const StatsSection = styled(FlexDivRowCentered)``;

const StatBox = styled(FlexDivColCentered)`
	height: 200px;
	width: 200px;
	background-image: url('assets/svg/snx-stat-background.svg');
	background-position: center;
	background-repeat: no-repeat;
	justify-content: center;
`;

const StatTitle = styled.p<{ titleColor: string }>`
	font-family: ${(props) => props.theme.fonts.mono};
	font-size: 14px;
	color: ${(props: any) => props.theme.colors[props.titleColor]};
	margin: 0;
`;

const StatValue = styled.p`
	font-family: ${(props) => props.theme.fonts.condensedBold};
	font-size: 28px;
	margin: 0;
`;

const BarStats = styled(FlexDiv)``;

const BarStatBox = styled(FlexDivCol)``;

const BarHeaderSection = styled(FlexDivRowCentered)``;
const BarTitle = styled.p``;
const BarContent = styled.div``;

export default DashboardPage;
