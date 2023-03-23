using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AbilityScores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Strength = table.Column<int>(type: "INTEGER", nullable: false),
                    Dexterity = table.Column<int>(type: "INTEGER", nullable: false),
                    Constitution = table.Column<int>(type: "INTEGER", nullable: false),
                    Intelligence = table.Column<int>(type: "INTEGER", nullable: false),
                    Wisdom = table.Column<int>(type: "INTEGER", nullable: false),
                    Charisma = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AbilityScores", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CharacterClasses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CharacterClasses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CharacterRaces",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CharacterRaces", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CharacterSkills",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Acrobatics = table.Column<int>(type: "INTEGER", nullable: false),
                    AnimalHandling = table.Column<int>(type: "INTEGER", nullable: false),
                    Arcana = table.Column<int>(type: "INTEGER", nullable: false),
                    Athletics = table.Column<int>(type: "INTEGER", nullable: false),
                    Deception = table.Column<int>(type: "INTEGER", nullable: false),
                    History = table.Column<int>(type: "INTEGER", nullable: false),
                    Insight = table.Column<int>(type: "INTEGER", nullable: false),
                    Intimidation = table.Column<int>(type: "INTEGER", nullable: false),
                    Investigation = table.Column<int>(type: "INTEGER", nullable: false),
                    Medicine = table.Column<int>(type: "INTEGER", nullable: false),
                    Nature = table.Column<int>(type: "INTEGER", nullable: false),
                    Perception = table.Column<int>(type: "INTEGER", nullable: false),
                    Performance = table.Column<int>(type: "INTEGER", nullable: false),
                    Persuasion = table.Column<int>(type: "INTEGER", nullable: false),
                    Religion = table.Column<int>(type: "INTEGER", nullable: false),
                    SleightOfHand = table.Column<int>(type: "INTEGER", nullable: false),
                    Stealth = table.Column<int>(type: "INTEGER", nullable: false),
                    Survival = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CharacterSkills", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Modificators",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StrengthModificator = table.Column<int>(type: "INTEGER", nullable: false),
                    DexterityModificator = table.Column<int>(type: "INTEGER", nullable: false),
                    ConstitutionModificator = table.Column<int>(type: "INTEGER", nullable: false),
                    IntelligenceModificator = table.Column<int>(type: "INTEGER", nullable: false),
                    WisdomModificator = table.Column<int>(type: "INTEGER", nullable: false),
                    CharismaModificator = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Modificators", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CharacterSheets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CharName = table.Column<string>(type: "TEXT", maxLength: 30, nullable: true),
                    Level = table.Column<int>(type: "INTEGER", nullable: false),
                    CharClassId = table.Column<int>(type: "INTEGER", nullable: false),
                    CharRaceId = table.Column<int>(type: "INTEGER", nullable: false),
                    ArmorClass = table.Column<int>(type: "INTEGER", nullable: false),
                    PlayerName = table.Column<string>(type: "TEXT", maxLength: 30, nullable: true),
                    ExpiriencePoints = table.Column<int>(type: "INTEGER", nullable: false),
                    Initiative = table.Column<int>(type: "INTEGER", nullable: false),
                    Speed = table.Column<int>(type: "INTEGER", nullable: false),
                    AbilityScoresId = table.Column<int>(type: "INTEGER", nullable: false),
                    SkillsId = table.Column<int>(type: "INTEGER", nullable: false),
                    Background = table.Column<string>(type: "TEXT", nullable: true),
                    Alignment = table.Column<string>(type: "TEXT", nullable: true),
                    CurrentHitPoints = table.Column<int>(type: "INTEGER", nullable: false),
                    MaxHitPoints = table.Column<int>(type: "INTEGER", nullable: false),
                    ModificatorsId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CharacterSheets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CharacterSheets_AbilityScores_AbilityScoresId",
                        column: x => x.AbilityScoresId,
                        principalTable: "AbilityScores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CharacterSheets_CharacterClasses_CharClassId",
                        column: x => x.CharClassId,
                        principalTable: "CharacterClasses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CharacterSheets_CharacterRaces_CharRaceId",
                        column: x => x.CharRaceId,
                        principalTable: "CharacterRaces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CharacterSheets_CharacterSkills_SkillsId",
                        column: x => x.SkillsId,
                        principalTable: "CharacterSkills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CharacterSheets_Modificators_ModificatorsId",
                        column: x => x.ModificatorsId,
                        principalTable: "Modificators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CharacterSheets_AbilityScoresId",
                table: "CharacterSheets",
                column: "AbilityScoresId");

            migrationBuilder.CreateIndex(
                name: "IX_CharacterSheets_CharClassId",
                table: "CharacterSheets",
                column: "CharClassId");

            migrationBuilder.CreateIndex(
                name: "IX_CharacterSheets_CharRaceId",
                table: "CharacterSheets",
                column: "CharRaceId");

            migrationBuilder.CreateIndex(
                name: "IX_CharacterSheets_ModificatorsId",
                table: "CharacterSheets",
                column: "ModificatorsId");

            migrationBuilder.CreateIndex(
                name: "IX_CharacterSheets_SkillsId",
                table: "CharacterSheets",
                column: "SkillsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CharacterSheets");

            migrationBuilder.DropTable(
                name: "AbilityScores");

            migrationBuilder.DropTable(
                name: "CharacterClasses");

            migrationBuilder.DropTable(
                name: "CharacterRaces");

            migrationBuilder.DropTable(
                name: "CharacterSkills");

            migrationBuilder.DropTable(
                name: "Modificators");
        }
    }
}
