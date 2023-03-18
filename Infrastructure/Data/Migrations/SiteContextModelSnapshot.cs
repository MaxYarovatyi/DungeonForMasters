﻿// <auto-generated />
using System;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace infrastructure.Data.Migrations
{
    [DbContext(typeof(SiteContext))]
    partial class SiteContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.4");

            modelBuilder.Entity("Core.Entities.AbilityScores", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Charisma")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Constitution")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Dexterity")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Intelligence")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Strength")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Wisdom")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("AbilityScores");
                });

            modelBuilder.Entity("Core.Entities.CharacterClass", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("CharacterClasses");
                });

            modelBuilder.Entity("Core.Entities.CharacterRace", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("CharacterRaces");
                });

            modelBuilder.Entity("Core.Entities.CharacterSheet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("AbilityScoresId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Alignment")
                        .HasColumnType("TEXT");

                    b.Property<int>("ArmorClass")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Background")
                        .HasColumnType("TEXT");

                    b.Property<int>("CharClassId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("CharName")
                        .HasColumnType("TEXT");

                    b.Property<int>("CharRaceId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("CurrentHitPoints")
                        .HasColumnType("TEXT");

                    b.Property<int>("ExpiriencePoints")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Initiative")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Level")
                        .HasColumnType("INTEGER");

                    b.Property<string>("MaxHitPoints")
                        .HasColumnType("TEXT");

                    b.Property<string>("PlayerName")
                        .HasColumnType("TEXT");

                    b.Property<int?>("SkillsId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Speed")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("AbilityScoresId");

                    b.HasIndex("CharClassId");

                    b.HasIndex("CharRaceId");

                    b.HasIndex("SkillsId");

                    b.ToTable("CharacterSheets");
                });

            modelBuilder.Entity("Core.Entities.SkillList", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("SkillList");
                });

            modelBuilder.Entity("Core.Entities.CharacterSheet", b =>
                {
                    b.HasOne("Core.Entities.AbilityScores", "AbilityScores")
                        .WithMany()
                        .HasForeignKey("AbilityScoresId");

                    b.HasOne("Core.Entities.CharacterClass", "CharClass")
                        .WithMany()
                        .HasForeignKey("CharClassId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.CharacterRace", "CharRace")
                        .WithMany()
                        .HasForeignKey("CharRaceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.SkillList", "Skills")
                        .WithMany()
                        .HasForeignKey("SkillsId");

                    b.Navigation("AbilityScores");

                    b.Navigation("CharClass");

                    b.Navigation("CharRace");

                    b.Navigation("Skills");
                });
#pragma warning restore 612, 618
        }
    }
}
