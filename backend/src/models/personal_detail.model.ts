import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";
import sequelize from "../config/db";

class PersonalDetail extends Model<
  InferAttributes<PersonalDetail>,
  InferCreationAttributes<PersonalDetail>
> {
  declare personalDetailId: CreationOptional<string>;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare phoneNumber: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

PersonalDetail.init(
  {
    personalDetailId: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(15),
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "user_accounts",
    timestamps: true,
    underscored: true,
    sequelize,
  }
);

(async () => {
  try {
    await PersonalDetail.sync({ force: true });
  } catch (error) {
    console.error(`Unable to connect to the database:`, error);
  }
})();

export default PersonalDetail;
