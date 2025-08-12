import BrandList from '@/components/Container/BrandList';
import BudgetTabs from "@/components/Container/BudgetTabs";
import CategoryList from '@/components/Container/CategoryList';
import FeatureList from '@/components/Container/FeatureList';
import YearRange from '@/components/Core/YearRange';
import ScreenTopNav from '@/components/nav/TopNav';
import BackButton from '@/components/Reusable/BackButton';
import ReusableIcon from '@/components/Reusable/Icon';
import Loader from '@/components/Reusable/Loader';
import ReusableText from '@/components/Reusable/Text';
import ReusableTile from '@/components/Reusable/Tile';
import ReusableInnerWrapper from '@/components/Reusable/Wrapper/Inner';
import ReusableOuterWrapper from '@/components/Reusable/Wrapper/Outer';
import ReusableScrollView from '@/components/Reusable/Wrapper/ScrollView';
import CustomTheme from '@/theme';
import { border, borderRadius } from '@/utils/Styles';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const vehicleState = {
    sort: null, 
    cognitoUser: null, 
    priceSelection: {frequency: 'yearly', min: 0, max: 0}, 
    brandSelection: null, 
    categorySelection: null, 
    yearSelection: null, 
    featureSelection: null
}

export default function Filtering() {

    const { sort, cognitoUser, priceSelection, brandSelection, categorySelection, yearSelection, featureSelection } = vehicleState;
    
    const [dirty, setDirty] = useState([]);
    const [tabSelection, setTotalBudgetToActive] = useState(priceSelection?.frequency === 'yearly' ? 0 : 1);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleNavigate = (screen: string) => {
        console.log('Navigate', screen)
    };

    const saveFilters = async (attributes, sort) => {}
    const saveSelectedFilter = async ({ filterType, selectedValue }) => {}
    const resetFilters = async (cognitoUser) => {}

    // const isRefined = fromTotalBudget > 100000 || fromMonthlyBudget > 3500 || fromYear > 1980 || dealerRating > 0 || brand.length > 0 || types.length > 0 || feature.length > 0;
    const isRefined = false;

    const addFilters = async () => {
        let attributes = {};
        let filterstoreload = {};
        
        if (dirty.includes('years')) {
            if (!yearSelection['min']) {
                attributes['custom:years'] = JSON.stringify({ ...yearSelection, min: 1980 });
            } else {
                attributes['custom:years'] = JSON.stringify(yearSelection);
            }
        }

        if (dirty.includes('prices')) {
            if (!yearSelection['min']) {
                attributes['custom:prices'] = JSON.stringify({ ...priceSelection, min: 0 });
            } else {
                attributes['custom:prices'] = JSON.stringify(priceSelection);
            }
        }

        if (dirty.includes('brand')) {
            attributes['custom:brands'] = JSON.stringify(brandSelection);
        }

        if (dirty.includes('categories')) {
            attributes['custom:categories'] = JSON.stringify(categorySelection);
        }

        if (dirty.includes('features')) {
            attributes['custom:features'] = JSON.stringify(featureSelection);
        }

        await saveFilters(attributes, sort);
    };

    const onFilterChange = async (filterType, selectedValue) => {
        debugger;
        if (!dirty.includes(filterType)) {
            setDirty([...dirty, filterType])
        };
        await saveSelectedFilter({ filterType, selectedValue })
    }

    const goBack = async () => {

        await resetFilters(cognitoUser);

        handleNavigate('Listing');
    }

    return (
        <ReusableScrollView>
            {loading && <Loader />}
            <ReusableOuterWrapper style={annoyingStyle1}>
                <ScreenTopNav style={annoyingStyle2}>
                    <ReusableInnerWrapper>
                        <BackButton iconName="arrowleft" handleOnPress={() => goBack()} iconSize={28} iconColor={CustomTheme.colors.cornflowerBlue} />
                    </ReusableInnerWrapper>
                    <ReusableInnerWrapper style={annoyingStyle3}>
                        <ReusableText style={annoyingStyle4}>
                            filters
                        </ReusableText>
                    </ReusableInnerWrapper>
                    <ReusableTile style={annoyingStyle5} handleTileSelection={() => addFilters()} shadowColor={CustomTheme.colors.periwinkleGray}>
                        <ReusableIcon iconName='md-checkmark' iconSize={24} iconColor='white' ionicons={true} />
                    </ReusableTile>
                </ScreenTopNav>

                {/* brand */}
                <BrandList
                    brandSelection={brandSelection}
                    onBrandSelectionChange={(brands) => onFilterChange('brand', brands)}
                />

                {/* Catagory */}
                <CategoryList
                    categorySelection={categorySelection}
                    onCategorySelection={(categories) => onFilterChange('categories', categories)}
                />

                {/* Features */}
                <FeatureList
                    featureSelection={featureSelection}
                    onFeatureSelection={(features) => onFilterChange('features', features)}
                />

                {/* Price */}
                <ReusableInnerWrapper style={annoyingStyle6}>
                    <ReusableText style={annoyingStyle7}>
                        price range
                    </ReusableText>
                </ReusableInnerWrapper>
                {/* Budget */}
                <BudgetTabs
                    priceSelection={priceSelection}
                    onFromValueChange={(min = 100) => onFilterChange('prices', { ...priceSelection, min })}
                    onToValueChange={(max) => onFilterChange('prices', { ...priceSelection, max })}
                    onTabChange={(frequency, min = 100, max) => onFilterChange('prices', { ...priceSelection, frequency, min, max })}
                />

                {/** Display credit score error */}
                {/*<ReusableInnerWrapper style={annoyingStyle13}>
                    <ReusableIcon iconName='md-information-circle-outline' iconSize={24} iconColor='black' ionicons={true} />
                    <ReusableText style={annoyingStyle14}>
                        Based on your credit score, you will not be able to afford and test drive some of the cars in this price range.
                    </ReusableText>
    </ReusableInnerWrapper>*/}
                {/** Display credit score error */}

                {/* Year */}
                <ReusableInnerWrapper style={annoyingStyle15}>
                    <ReusableText style={annoyingStyle16}>
                        year range
                    </ReusableText>
                </ReusableInnerWrapper>
                <YearRange
                    tabSelection={tabSelection}
                    currentMin={yearSelection?.min}
                    currentMax={yearSelection?.max}
                    onFromValueChange={(min = 1980) => onFilterChange('years', { ...yearSelection, min })}
                    onToValueChange={(max) => onFilterChange('years', { ...yearSelection, max })}
                    width={width} CustomTheme={CustomTheme}
                />

                {/* Rating */}
                {/*<ReusableInnerWrapper style={annoyingStyle17}>
                    <ReusableText style={annoyingStyle18}>
                        dealer rating
                    </ReusableText>
                </ReusableInnerWrapper>
<RatingRange tabSelection={tabSelection} width={width} CustomTheme={CustomTheme} /> */}
            </ReusableOuterWrapper>
        </ReusableScrollView>
    );
}

const annoyingStyle1 = {
    backgroundColor: 'white',
    width: width,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 80,
    minHeight: height
};

const annoyingStyle2 = {
    borderBottomColor: 'mishka',
    borderBottomWidth: 1,
    width: '90%',
    justifyContent: 'space-between',
    left: 1,
};

const annoyingStyle3 = {
    position: 'relative',
    left: 13
};

const annoyingStyle4 = {
    textTransform: 'uppercase',
    fontFamily: 'BebasNeue-Regular',
    color: 'black',
    fontSize: 34,
    marginTop: 16,
    marginBottom: 16,
    height: 41,
    lineHeight: 41
};

const annoyingStyle5 = {
    width: 52,
    height: 52,
    marginLeft: 23,
    ...(borderRadius(10)),
    backgroundColor: 'cornflowerBlue'
};

const annoyingStyle6 = {
    justifyContent: 'flex-start',
    marginTop: 28,
    alignItems: 'flex-start',
    marginLeft: 25.62
};

const annoyingStyle7 = {
    textTransform: 'uppercase',
    fontFamily: 'BebasNeue-Regular',
    color: 'raven',
    fontSize: 24,
    textAlign: 'left',
    lineHeight: 24
};

const annoyingStyle13 = {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 50,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    width: '88%',
    ...(border(1, 'red')),
    backgroundColor: 'chablis',
    ...(borderRadius(10)),
}

const annoyingStyle14 = {
    fontFamily: 'Poppins-Regular',
    color: 'black',
    fontSize: 11,
    textAlign: 'left',
    marginLeft: 5,
    lineHeight: 15
};

const annoyingStyle15 = {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 25.62,
    marginTop: 20
};

const annoyingStyle16 = {
    textTransform: 'uppercase',
    fontFamily: 'BebasNeue-Regular',
    color: 'raven',
    fontSize: 24,
    textAlign: 'left',
    lineHeight: 27
};

const annoyingStyle17 = {
    justifyContent: 'flex-start',
    marginTop: 10,
    alignItems: 'flex-start',
    marginLeft: 25.62
};

const annoyingStyle18 = {
    textTransform: 'uppercase',
    fontFamily: 'BebasNeue-Regular',
    color: 'raven',
    fontSize: 24,
    textAlign: 'left',
    lineHeight: 27
};