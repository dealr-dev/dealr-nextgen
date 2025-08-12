import Audi from '@/assets/img/Brands/Audi';
import Bmw from '@/assets/img/Brands/Bmw';
import Ford from '@/assets/img/Brands/Ford';
import LandRover from '@/assets/img/Brands/LandRover';
import Bakkies from '@/assets/img/Category/Bakkies';
import Electrics from "@/assets/img/Category/Electrics";
import HatchBacks from '@/assets/img/Category/HatchBacks';
import Hyper from "@/assets/img/Category/Hyper";
import Luxury from "@/assets/img/Category/Luxury";
import MiniVans from '@/assets/img/Category/MiniVans';
import Sedans from '@/assets/img/Category/Sedans';
import Sport from "@/assets/img/Category/Sport";
import SUVs from '@/assets/img/Category/SUVs';
import Diesel from '@/assets/img/Features/Diesel';
import FullLed from '@/assets/img/Features/FullLed';
import Gasoline from '@/assets/img/Features/Gasoline';
import Hybrid from '@/assets/img/Features/Hybrid';
import Manual from '@/assets/img/Features/Manual';
import CustomTheme from '@/theme';
import React from 'react';


export const brands = [
    [
        {
            "img": <Audi />,
            "id": "Audi",
            "cat": "brand"
        },
        {
            "img": <Bmw />,
            "id": "BMW",
            "cat": "brand"
        },
        {
            "img": <Ford />,
            "id": "Ford",
            "cat": "brand"
        },
        {
            "img": <LandRover />,
            "id": "Land Rover",
            "cat": "brand"
        }
    ],
    [
        {
            "img": <Audi />,
            "id": "Mercedes",
            "cat": "brand"
        }
    ]
];

export const defaultBodyTypes = [
    [
        {
            "img": "MiniVans",
            "_id": "minivan",
            "name": "Mini Vans",
            "cat": "type"
        },
        {
            "img": "Sedans",
            "_id": "sedan",
            "name": "Sedans",
            "cat": "type"
        },
        {
            "img": "SUVs",
            "_id": "suv",
            "name": "SUVs",
            "cat": "type"
        },
        {
            "img": "Bakkies",
            "_id": "bakkie",
            "name": "Bakkies",
            "cat": "type"
        }       
    ],
    [
        {
            "img": "HatchBacks",
            "_id": "hatchback",
            "name": "HatchBacks",
            "cat": "type"
        },
        {
            "img": "Luxuries",
            "_id": "luxury",
            "name": "Luxuries",
            "cat": "type"
        },
        {
            "img": "Electrics",
            "_id": "electronic",
            "name": "Electronics",
            "cat": "type"
        },
        {
            "img": "Sports",
            "_id": "sport",
            "name": "Sports",
            "cat": "type"
        }
    ],
    [
        {
            "img": "Hypers",
            "_id": "hyper",
            "name": "Hypers",
            "cat": "type"
        }
    ]
]

export const bodyTypes = [
    [
        {
            "img": "MiniVans",
            "id": "minivan",
            "cat": "type"
        },
        {
            "img": "Sedans",
            "id": "sedan",
            "cat": "type"
        },
        {
            "img": "SUVs",
            "id": "suv",
            "cat": "type"
        },
        {
            "img": "Bakkies",
            "id": "bakkie",
            "cat": "type"
        }
    ],
    [
        {
            "img": "HatchBacks",
            "id": "hatchback",
            "cat": "type"
        }
    ]
]

export const defaultFeatures =  [
    [{
        "img": "Diesel",
        "name": "Diesel",
        "_id": "Diesel"
    },
    {
        "img": "FullLed",
        "name": "Full Led",
        "_id": "FullLed"
    },
    {
        "img": "Gasoline",
        "name": "Gasoline",
        "_id": "Gasoline"
    },
    {
        "img": "Hybrid",
        "name": "Hybrid",
        "_id": "Hybrid"
    }],
    [
    {
        "img": "Manual",
        "name": "Manual",
        "_id": "Manual"
    }
    ]
]

export const renderComponent = (comp, isSelected) => {
    if(comp === 'MiniVans'){
        return <MiniVans
                    fill={isSelected ? CustomTheme.colors.cornflowerBlue : CustomTheme.colors.cornflowerBlue}
                />
    }
    if(comp === 'Sedans'){
        return <Sedans fill={isSelected ? CustomTheme.colors.cornflowerBlue : CustomTheme.colors.cornflowerBlue} />
    }
    if(comp === 'SUVs') {
        return <SUVs stroke={isSelected ? CustomTheme.colors.cornflowerBlue : CustomTheme.colors.cornflowerBlue} />
    }
    if(comp === 'Bakkies') {
        return <Bakkies fill={isSelected ? CustomTheme.colors.cornflowerBlue : CustomTheme.colors.cornflowerBlue} />
    }
    if(comp === 'HatchBacks') {
        return <HatchBacks fill={isSelected ? CustomTheme.colors.cornflowerBlue : CustomTheme.colors.cornflowerBlue} />
    }
    if(comp === 'Electrics') {
        return <Electrics fill={isSelected ? CustomTheme.colors.cornflowerBlue : CustomTheme.colors.cornflowerBlue} />
    }
    if(comp === 'Luxuries') {
        return <Luxury fill={isSelected ? CustomTheme.colors.cornflowerBlue : CustomTheme.colors.cornflowerBlue} />
    }
    if(comp === 'Sports') {
        return <Sport fill={isSelected ? CustomTheme.colors.cornflowerBlue : CustomTheme.colors.cornflowerBlue} />
    }
    if(comp === 'Hypers') {
        return <Hyper fill={isSelected ? CustomTheme.colors.cornflowerBlue : CustomTheme.colors.cornflowerBlue} />
    }
    if(comp === 'Diesel') {
        return <Diesel
                    fill={isSelected ? CustomTheme.colors.cornflowerBlue : CustomTheme.colors.white}
                    stroke={isSelected ? CustomTheme.colors.white : CustomTheme.colors.cornflowerBlue}
                    stopColor={isSelected ? CustomTheme.colors.rose : CustomTheme.colors.rose}
                />
    }
    if(comp === 'FullLed') {
        return <FullLed
                stroke={isSelected ? CustomTheme.colors.white : CustomTheme.colors.cornflowerBlue}
                fill={isSelected ? CustomTheme.colors.cornflowerBlue : CustomTheme.colors.white}
            />
    }
    if(comp === 'Manual') {
        return <Manual
                stroke={isSelected ? CustomTheme.colors.white : CustomTheme.colors.cornflowerBlue}
                fill={isSelected ? CustomTheme.colors.cornflowerBlue : CustomTheme.colors.white}
            />
    }
    if(comp === 'Gasoline') {
        return <Gasoline
                    stroke={isSelected ? CustomTheme.colors.cornflowerBlue : CustomTheme.colors.cornflowerBlue}
                    fill={isSelected ? CustomTheme.colors.cornflowerBlue : CustomTheme.colors.cornflowerBlue}
                    stopColor={isSelected ? CustomTheme.colors.rose : CustomTheme.colors.rose}
                />
    }
    if(comp === 'Hybrid') {
        return <Hybrid
                    stroke={isSelected ? CustomTheme.colors.white : CustomTheme.colors.cornflowerBlue}
                    fill={isSelected ? CustomTheme.colors.cornflowerBlue : CustomTheme.colors.white}
                    stopColor={isSelected ? CustomTheme.colors.cornflowerBlue : CustomTheme.colors.white}
                />
    }
    return null;
};
